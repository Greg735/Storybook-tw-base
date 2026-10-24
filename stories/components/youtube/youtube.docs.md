<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

## Intro

The `YouTube` component allows you to embed a YouTube video within your project. You can customize the video by specifying the video ID and title.

## Implementation example
```
  {% include '@components/youtube/youtube.twig' with {
    video_id: 'dQw4w9WgXcQ',
    title: 'YouTube video player',
  }%}
```