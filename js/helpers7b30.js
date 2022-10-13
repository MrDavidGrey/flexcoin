function getVar(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

let notifies_iter = 0;
function show_notify(type, text) {

	let classType = 'error';
	if(type == 'success') {
		classType = 'success';
	}

	let html = '';

	html += '<div data-id="' + notifies_iter + '" class="vue-notification-wrapper" style="transition: all 300ms ease 0s;">';
	html += '	<div class="vue-notification-template vue-notification ' + classType + '">';
	html += '		<div class="notification-content">' + text + '</div>';
	html += '	</div>';
	html += '</div>';

	$(document).find('.vue-notification-group span').append(html);

	setTimeout(function(notify_id) {
		$(document).find('.vue-notification-group span .vue-notification-wrapper[data-id="' + notify_id + '"]').remove();
	}, 10000, notifies_iter);

	notifies_iter++;
}


function show_modal(modal_name) {
	$(document).find('div[data-modal="' + modal_name + '"]').show();

	alignment_modal();
}


function hide_modals() {
	$(document).find('div[data-modal]').hide();
	$(document).find('div[data-modal] input').val('');
	$(document).find('div[data-modal] textarea').val('');
}

function alignment_modal() {
	$(document).find('.modal:visible').each(function(ind, elem) {
		$(elem).find('.v--modal').css({
			left: 'calc(50% - (' + $(elem).find('.v--modal').width() + 'px / 2))',
			top: 'calc(50% - (' + $(elem).find('.v--modal').height() + 'px / 2))',
		});
	});
}


function convert_server_time(time) {
	let new_time = new Date(time * 1000).toLocaleString('en', {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false}).replace(/\,/g, '').split(' ')

	if(new_time[3] == 'at') {
		new_time.splice(3, 1);
	}

	if(new_time[3].toString().substring(0, 2) == '24') {
		new_time[3] = '00' + new_time[3].toString().substring(2);
	}

	return new_time[1] + ' ' + new_time[0].substring(0,3) + ' ' + new_time[2] + ' ' + new_time[3];
}


function timesConvert() {
	$(document).find('[data-timestamp]').each(function(ind, elem) {
		let time = $(elem).attr('data-timestamp');

		if(time != '') {
			let new_time = convert_server_time(time);

			if($(elem)[0].nodeName == 'INPUT' || $(elem)[0].nodeName == 'TEXTAREA') {
				$(elem).val(new_time);
			} else {
				$(elem).text(new_time);
			}

			$(elem).removeAttr('data-timestamp');
		}
	});
}


function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


$(document).ready(function() {

	timesConvert();

	$(document).on('click', '.vue-notification-wrapper', function() {
		$(this).hide();
	});


	$(document).on('click', '.modal .close, .modal .v--modal-background-click', function(e) {
    	if(($(e.target).hasClass('close') == false && $(e.target).parents('.close').length == 0) && $(e.target).parents('.v--modal').length != 0) {
    		return false;
    	}

    	$(this).parents('.modal').hide();
    });
});