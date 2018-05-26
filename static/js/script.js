function openOrderPage() {
    setTimeout(function () {
        $('.first-page').css('opacity', 0);
        $('.first-page').hide();
        $('.second-page').show();
        $('.second-page').css('opacity', 1);
        $('.content-text').html('2. Order photos');
        var myList = $('.sorter');

        $('canvas').each(function (i) {
            if (i < 4) {
                $('.sorter li:eq(' + i + ') span').append($(this));
            }
        });
        $('.img-content').each(function() {
            if (!$(this).html() )
                $(this).parent().remove();
        })
        //$('li').each(function() { if ($(this).html() == '') $(this).remove() })
    }, 500);

}

$(function () {
    $('ul.sorter').amigoSorter();
});

$(function () {
    $('ul.sorter').amigoSorter({
        li_helper: "li_helper",
        li_empty: "empty",
        onTouchStart: function () {
        },
        onTouchMove: function () {
        },
        onTouchEnd: function () {
        }
    });
});


/* THE UPLOAD SCRIPTS */
//////////////////////////////////////////
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = 'http://localhost:3000/upload_media',
        uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });
    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: true,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        $('.progress').removeClass('hidden');
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>');
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        console.log('dataloaded' + data.loaded);
        console.log('datatotal' + data.total);
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}).on('fileuploadstop', function (e, data) {
    openOrderPage()
});

$('#fileupload').bind('fileuploadprogress', function (e, data) {
    // Log the current bitrate for this upload:
    console.log(data.bitrate);
});

$('.progress-bar').on('stylechanged', function () {
    console.log($(this).css('width'));
    console.log('css changed');
});

