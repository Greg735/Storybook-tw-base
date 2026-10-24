<div class="mb-1">
	<span class="badge text-bg-blue">Version: 0.1</span>
</div>
<div class="mb-1">
	<span class="badge text-bg-red">Status: Not tested</span>
</div>
<div class="mb-4">
	<span class="badge text-bg-warning">Documentation: TODO</span>
</div>

# Powered by scrollCue

The **Animations** utility provides several animation types for elements as they enter the viewport, using the [scrollCue](https://prjct-samwest.github.io/scrollCue/) library. These animations can be customized with options such as offset, duration, and type of animation.

## Usage

The following example demonstrates how to add an animation to a h1 element:

```
<h1 class="py-6" data-cue="fadeIn" data-duration="800">
  Animated Content
</h1>
```
## Integration

Set default value directly in 'animations.behaviors.js' : 
```
document.addEventListener("DOMContentLoaded", function() {
    scrollCue.init({
        duration : 300,
        interval : -200,
        percentage : 0.8
    });
});
```

By default there's no custom value :
```
document.addEventListener("DOMContentLoaded", function() {
    scrollCue.init({});
});
```

If you don't want use animations simply don't add attribute used for scrollCue. 

How. Simply. Is. That. ?