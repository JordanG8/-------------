$sourceDir = "public\assets\videos"
$targetDir = "gemini_videos"

if (!(Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}

$videos = Get-ChildItem -Path $sourceDir -Filter *.mp4

foreach ($video in $videos) {
    $sourcePath = $video.FullName
    $targetPath = Join-Path -Path $targetDir -ChildPath $video.Name
    Write-Host "Compressing $($video.Name)..."
    
    ffmpeg -y -i $sourcePath -vcodec libx264 -crf 30 -preset fast -vf scale=-2:720 -acodec aac -b:a 128k $targetPath
}

Write-Host "All videos compressed."
