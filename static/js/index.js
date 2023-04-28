window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 5000,
    }

	// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    bulmaSlider.attach();


    // Interactive demo
	var interactive_video = {
		'object': $('#option-object > .btn > input').val(),
		'lighting': $('#option-lighting > .btn > input').val(),
		'rotate': $('#option-rotate > .btn > input').val(),
		'rotidx': 0,
	}

	function reload_interactive_video() {
		var obj = interactive_video.object
		var lgt = interactive_video.lighting
		var rot = interactive_video.rotate
		var path = './static/videos/' + obj + '_' + lgt + '_' + rot + '_ours.mp4'
		// Fixed to absolute width/height to avoid flash
		var container_jq = $('#interactive-container')
		container_jq.width(container_jq.width())
		container_jq.height(container_jq.height())
		// Load new video
		var video_jq = $('#interactive-video')
		var video_dom = video_jq[0]
		video_jq.find('source').attr('src', path)
		video_dom.load()
	}

	$('#interactive-video').on('loadeddata', function(){
		this.currentTime = this.duration * interactive_video.rotidx / 100;
		var container_jq = $('#interactive-container')
		container_jq.attr('style', null)
	})

	function setInterpolationImage(i) {
		interactive_video.rotidx = i
		var video_dom = $('#interactive-video')[0]
		video_dom.currentTime = video_dom.duration * i / 100;
	}

    $('#option-object > .btn').click(function() {
     	interactive_video.object = $(this).find('input').val()
     	reload_interactive_video()
    })

    $('#option-lighting > .btn').change(function() {
    	interactive_video.lighting = $(this).find('input').val()
     	reload_interactive_video()
    })

    $('#option-rotate > .btn').change(function() {
    	interactive_video.rotate = $(this).find('input').val()
      	reload_interactive_video()
    })

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);

})

// $('#results-ours video > source').each(function(idx){
// 	// $(this)[0].src = './static/videos/ours_green_plant_r_lgt.mp4'
// 	$(this).attr('src', './static/videos/ours_green_plant_r_lgt.mp4')
// 	console.log($(this).attr('src'))
// 	$(this).load()
// })


// $('#results-ours video').each(function(idx){
// 	$(this).find('source').attr('src', './static/videos/ours_green_plant_r_lgt.mp4')
// 	$(this)[0].load()
// })
