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

$raw = file_get_contents('php://input', false, null, 0, 4097);
if (!is_string($raw) || $raw === '' || strlen($raw) > 4096) {
    http_response_code(204);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data) || (int)($data['v'] ?? 0) !== 1) {
    http_response_code(204);
    exit;
}

$pick = static function ($value, array $allowed, string $fallback): string {
    $value = strtolower(trim((string)$value));
    return in_array($value, $allowed, true) ? $value : $fallback;
};

$path = (string)($data['path'] ?? '/');
$path = (string)(parse_url($path, PHP_URL_PATH) ?? '/');
$path = preg_replace('/[\x00-\x1F\x7F\t\r\n]+/u', '', $path) ?? '/';
if ($path === '' || $path[0] !== '/') $path = '/';
$path = mb_substr($path, 0, 300, 'UTF-8');

$ref = strtolower(trim((string)($data['ref'] ?? 'direct')));
$ref = preg_replace('/[^a-z0-9.\-_:]/', '', $ref) ?? 'unknown';
if ($ref === '') $ref = 'unknown';
$ref = substr($ref, 0, 120);

$device = $pick($data['device'] ?? '', ['mobile', 'tablet', 'desktop'], 'other');
$os = $pick($data['os'] ?? '', ['ios', 'android', 'windows', 'macos', 'linux', 'other'], 'other');
$browser = $pick($data['browser'] ?? '', ['chrome', 'safari', 'edge', 'firefox', 'other'], 'other');
$screen = $pick($data['screen'] ?? '', ['small', 'medium', 'large'], 'other');
$firstEver = !empty($data['firstEver']) ? '1' : '0';
$firstToday = !empty($data['firstToday']) ? '1' : '0';
$newSession = !empty($data['newSession']) ? '1' : '0';

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
    $timestamp,
    $path,
    $ref,
    $device,
    $os,
    $browser,
    $screen,
    $firstEver,
    $firstToday,
    $newSession
]) . "\n";

@file_put_contents($file, $row, FILE_APPEND | LOCK_EX);
http_response_code(204);
