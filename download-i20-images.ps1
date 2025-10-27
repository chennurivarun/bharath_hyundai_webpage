# Download i20 images
$i20Images = @(
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-5.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightbig.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-5.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Exterior/pc/i20-exterior-6.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-5.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Interior/pc/i20-interior-main.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Performance/pc/i20-performance-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-5.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Safety/pc/i20-safety-6.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-1.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-2.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-3.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-4.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-5.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Convenience/pc/i20-convenience-6.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackinserts.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/knight/i20knightallblackseats.jpg",
    "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/i20/Highlights/pc/i20-highlight-banner.jpg"
)

$outputDir = "public\images\i20"
$client = New-Object System.Net.WebClient

foreach ($url in $i20Images) {
    try {
        $filename = Split-Path $url -Leaf
        $outputPath = Join-Path $outputDir $filename
        Write-Host "Downloading: $filename"
        $client.DownloadFile($url, $outputPath)
        Start-Sleep -Milliseconds 500
    }
    catch {
        Write-Host "Failed to download: $url - $($_.Exception.Message)"
    }
}

Write-Host "i20 images download completed!"
