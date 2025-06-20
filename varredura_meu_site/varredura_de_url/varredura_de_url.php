<?php
// ==== CONFIGURAÇÕES ====
$baseUrl = "https://souzax.pro"; // seu domínio principal

// Lista de caminhos que você quer testar (adicione conforme necessário)
$caminhos = [
    "index.html",
    "admin/index.php",
    "admin/",
    "config.php",
    "database/connection.php",
    "api/user.php",
    "api/",
    ".env",
    "login.php",
    "dashboard.php",
    "secret/",
    "admin/secret.php"
];

function testarUrl($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_NOBODY, true); // Apenas cabeçalhos
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code;
}

echo "🔍 Verificando acessibilidade em: $baseUrl\n\n";

foreach ($caminhos as $caminho) {
    $url = rtrim($baseUrl, '/') . '/' . ltrim($caminho, '/');
    $codigo = testarUrl($url);

    if ($codigo >= 200 && $codigo < 400) {
        echo "✅ [$codigo] ACESSÍVEL => $url\n";
    } else {
        echo "❌ [$codigo] INACESSÍVEL => $url\n";
    }
}
