<?php
declare(strict_types=1);

header('Cache-Control: no-store, max-age=0');
header('X-Robots-Tag: noindex, nofollow, noarchive');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit;
}

$fetchSite = strtolower((string)($_SERVER['HTTP_SEC_FETCH_SITE'] ?? ''));
if ($fetchSite === 'cross-site') {
    http_response_code(403);
    exit;
}

$origin = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '') {
    $host = strtolower((string)(parse_url($origin, PHP_URL_HOST) ?? ''));
    if ($host !== 'ayuto.xsrv.jp') {
        http_response_code(403);
        exit;
    }
}

$raw = file_get_contents('php://input', false, null, 0, 8193);
if (!is_string($raw) || $raw === '' || strlen($raw) > 8192) {
    http_response_code(204);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data) || (int)($data['v'] ?? 0) !== 2) {
    http_response_code(204);
    exit;
}

$pick = static function ($value, array $allowed, string $fallback): string {
    $value = strtolower(trim((string)$value));
    return in_array($value, $allowed, true) ? $value : $fallback;
};

$clean = static function ($value, int $max = 120): string {
    $value = trim((string)$value);
    $value = preg_replace('/[\x00-\x1F\x7F\t\r\n]+/u', '', $value) ?? '';
    return mb_substr($value, 0, $max, 'UTF-8');
};

$hostish = static function ($value, int $max = 120): string {
    $value = strtolower(trim((string)$value));
    $value = preg_replace('/[^a-z0-9.\-_:]/', '', $value) ?? '';
    return substr($value !== '' ? $value : 'unknown', 0, $max);
};

$path = (string)($data['path'] ?? '/');
$path = (string)(parse_url($path, PHP_URL_PATH) ?? '/');
$path = $clean($path, 300);
if ($path === '' || $path[0] !== '/') $path = '/';
if (str_starts_with($path, '/git-test/')) $path = substr($path, 9) ?: '/';

$event = $pick($data['event'] ?? '', ['pageview', 'performance', 'click', 'engagement'], 'unknown');
$ref = $hostish($data['ref'] ?? 'direct');
$device = $pick($data['device'] ?? '', ['mobile', 'tablet', 'desktop'], 'other');
$os = $pick($data['os'] ?? '', ['ios', 'android', 'windows', 'macos', 'linux', 'other'], 'other');
$browser = $pick($data['browser'] ?? '', ['chrome', 'safari', 'edge', 'firefox', 'other'], 'other');
$screen = $pick($data['screen'] ?? '', ['small', 'medium', 'large'], 'other');
$orientation = $pick($data['orientation'] ?? '', ['portrait', 'landscape'], 'other');
$dpr = $pick($data['dpr'] ?? '', ['1', '1.5', '2', '2.5', '3', '3.5', '4'], 'other');
$memory = $pick($data['memory'] ?? '', ['under2', '2to3', '4to7', '8plus', 'unknown'], 'unknown');
$cpu = $pick($data['cpu'] ?? '', ['1', '2to3', '4to7', '8plus', 'unknown'], 'unknown');
$touch = $pick($data['touch'] ?? '', ['touch', 'no-touch'], 'unknown');
$network = $pick($data['network'] ?? '', ['slow-2g', '2g', '3g', '4g', 'save-data', 'unknown'], 'unknown');
$language = strtolower($clean($data['language'] ?? 'unknown', 16));
$timezone = $clean($data['timezone'] ?? 'unknown', 64);
$firstEver = !empty($data['firstEver']) ? '1' : '0';
$firstToday = !empty($data['firstToday']) ? '1' : '0';
$newSession = !empty($data['newSession']) ? '1' : '0';
$utmSource = $clean($data['utmSource'] ?? '', 80);
$utmMedium = $clean($data['utmMedium'] ?? '', 80);
$utmCampaign = $clean($data['utmCampaign'] ?? '', 120);
$target = $pick($data['target'] ?? '', ['phone', 'line', 'external', 'internal'], 'none');
$ttfb = $pick($data['ttfb'] ?? '', ['lt250', '250to499', '500to999', '1000to1999', '2000to3999', '4000plus'], 'none');
$dom = $pick($data['dom'] ?? '', ['lt250', '250to499', '500to999', '1000to1999', '2000to3999', '4000plus'], 'none');
$load = $pick($data['load'] ?? '', ['lt250', '250to499', '500to999', '1000to1999', '2000to3999', '4000plus'], 'none');
$navType = $pick($data['navType'] ?? '', ['navigate', 'reload', 'back_forward', 'prerender'], 'unknown');
$timeBucket = $pick($data['timeBucket'] ?? '', ['lt10s', '10to29s', '30to59s', '1to2m', '3to9m', '10mplus'], 'none');
$scrollBucket = $pick($data['scrollBucket'] ?? '', ['0to24', '25to49', '50to74', '75to94', '95to100'], 'none');

date_default_timezone_set('Asia/Tokyo');
$timestamp = date('Y-m-d\TH:i:sP');
$isTest = str_starts_with((string)($_SERVER['REQUEST_URI'] ?? ''), '/git-test/');
$dataDir = $isTest
    ? '/home/ayuto/ayuto.xsrv.jp/analytics-data-test'
    : '/home/ayuto/ayuto.xsrv.jp/analytics-data';

if (!is_dir($dataDir) || !is_writable($dataDir)) {
    http_response_code(204);
    exit;
}

$file = $dataDir . '/events-' . date('Y-m') . '.tsv';
$row = implode("\t", [
    $timestamp, $event, $path, $ref, $device, $os, $browser, $screen,
    $orientation, $dpr, $memory, $cpu, $touch, $language, $timezone, $network,
    $firstEver, $firstToday, $newSession, $utmSource, $utmMedium, $utmCampaign,
    $target, $ttfb, $dom, $load, $navType, $timeBucket, $scrollBucket
]) . "\n";

@file_put_contents($file, $row, FILE_APPEND | LOCK_EX);
http_response_code(204);
