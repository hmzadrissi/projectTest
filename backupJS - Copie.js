define(['jquery', 'jquery/ui'], function ($, alert) {
    "use strict";
    $.widget('personnaliastion.checkbox_personnaliser', {
        _create: function () {
            function prepareOptions(options, prefix) {
                var urls = [];
                var parsedOptions = jQuery.parseJSON(options);
                if (parsedOptions.length > 0) {
                    jQuery.each(parsedOptions, function(index, value) {
                        urls.push(prefix + value);
                    });
                }
                return urls;
            }

            var url_letters = this.options.url_letters;
            var url_numbers = this.options.url_numbers;
            var url_clubs = this.options.url_clubs;
            var letters = prepareOptions(this.options.letters, url_letters);
            var numbers = prepareOptions(this.options.numbers, url_numbers);
            var clubs = prepareOptions(this.options.clubs, url_clubs);
            var heightName = this.options.heightName;
            var heightNumber = this.options.heightNumber;
            var heightClub = this.options.heightClub;
            var marginTopName = this.options.marginTopName;
            var marginTopNumber = this.options.marginTopNumber;
            var marginTopClub = this.options.marginTopClub;
            var marginLeftName = this.options.marginLeftName;
            var marginLeftNumber = this.options.marginLeftNumber;
            var marginLeftClub = this.options.marginLeftClub;
            var positionPrevisuBlocks = this.options.positionPrevisuBlocks;
            var modal_title = this.options.modal_title;
            var modal_content = this.options.modal_content;
            var modal_formated_price = this.options.modal_formated_price;
            var modal_total_text = this.options.modal_total_text;
            var modal_ttc_text = this.options.modal_ttc_text;
            var modal_warning_conditions = this.options.modal_warning_conditions;
            var modal_warning_content = this.options.modal_warning_content;
            var modal_confirmation_title = this.options.modal_confirmation_title;
            var modal_confirmation_text = this.options.modal_confirmation_text;
            var arraylToPrelaod = letters.concat(numbers, clubs);

            jQuery(document).ready(function () {
                if (arraylToPrelaod.length > 0) {
                    preload(arraylToPrelaod);
                }
                var isChecked = jQuery('#personnaliser_checkbox').prop("checked");
                if (isChecked) {
                    jQuery('.sectionPersonnalisation').removeClass("disabled");
                } else {
                    jQuery('.sectionPersonnalisation').addClass("disabled");
                    jQuery('div.field_personnalisation input.input-text').val('').trigger('change');
                }
                jQuery('#personnaliser_checkbox_text').on('click', function () {
                    jQuery('#personnaliser_checkbox').prop("checked", !isChecked).trigger("change");
                });
                jQuery('.sectionPersonnalisation').css("display", "block");
                jQuery('#personnaliser_checkbox').on('change', function () {
                    isChecked = jQuery(this).prop("checked");
                    if (!isChecked) {
                        jQuery('.sectionPersonnalisation').addClass("disabled");
                        jQuery('.product-custom-option,select#select2-club').attr('disabled', 'disabled');
                        // jQuery('.product-custom-option').prop("checked", false);
                        // jQuery('div.field_personnalisation input.input-text, div.field_personnalisation select').val('').trigger('change');
                        // jQuery('div.field_personnalisation input.radio').first().prop("checked", true).trigger('change');
                        jQuery('.fotorama').data('fotorama').show(0);
                        jQuery('.fotorama').fotorama({allowfullscreen: true, keyboard: true, swipe: true});
                        hide_previsu();
                    } else  {
                        jQuery('.sectionPersonnalisation').removeClass("disabled");
                        jQuery('select.product-custom-option,input.product-custom-option').removeAttr("disabled");
                        jQuery('.fotorama').data('fotorama').show(jQuery('div.fotorama__nav__frame--dot').length - 1);
                        jQuery('.fotorama').fotorama({allowfullscreen: false, keyboard: false, swipe: false});
                        show_previsu();
                    }
                });

                $(window).resize(function () {
                    jQuery('.fotorama').fotorama({allowfullscreen: !jQuery('#personnaliser_checkbox').prop("checked"), keyboard: !jQuery('#personnaliser_checkbox').prop("checked"), swipe: !jQuery('#personnaliser_checkbox').prop("checked")});
                });

                if (arraylToPrelaod.length > 0) {
                    /*******************prévisu***********************/
                    /**NAME**/
                    var element_text_name = jQuery("#option-type-text-name .control").find('input[type="text"]');
                    var array_letters_allowed = /^[a-z]+$/;

                    element_text_name.on("input", function () {
                        var $ul_previsu_name = $("#ul_previsu_name").empty();
                        var array_name_value = $(this).val().toLowerCase().split("");

                        array_name_value.forEach(function (value) {
                            if (value !== " ") {
                                var image_url_letter = array_letters_allowed.test(value) ? url_letters + value + ".png" : url_letters + "wrong.png";
                                $ul_previsu_name.append('<li style="display:inline-block; height: 100%;margin:0;width:auto;"><img style="display:inline-block; height: 100%; margin:0;width:auto;" src="' + image_url_letter + '"></li>');
                            } else {
                                $ul_previsu_name.append('<li style="display:flex; height: 100%;">&nbsp;&nbsp;</li>');
                            }
                        });
                    });

                    /**NUMBER**/
                    var element_select_number = jQuery(".field_personnalisation .control-select select.admin__control-select");
                    var array_numbers_allowed = /^[0-9]+$/;
                    element_select_number.on("select2:close", function () {
                        var element_text_number = jQuery("ul.select2-selection__rendered li.select2-selection__choice span.select2-selection__choice__display").text().trim();
                        var $ul_previsu_number = $("#ul_previsu_number").empty();

                        if (element_text_number !== "") {
                            var array_number_value = element_text_number.split("");
                            array_number_value.forEach(function (value) {
                                if (array_numbers_allowed.test(value)) {
                                    var image_url_number = url_numbers + value + ".png";
                                    $ul_previsu_number.append('<li style="display:block; height: 100%;"><img style="display:inline-block; height:100%; margin:0; padding:0; width:auto;" src="' + image_url_number + '"></li>');
                                }
                            });
                        }
                    });
                    element_select_number.on("select2:open", function () {
                        $("#ul_previsu_number").empty();
                    });

                    /**CLUB**/
                    var element_select_club = jQuery("#select2-club");
                    element_select_club.on("select2:close", function () {
                        var value_club = jQuery("#option-type-text-club option:selected").val();
                        var $ul_previsu_club = $("#ul_previsu_club").empty();
                        if (value_club) {
                            var image_url_club = url_clubs + "default.png";
                            $ul_previsu_club.append('<li style="display:flex; align-items: flex-start; justify-content: center; height: 100%; width: 100%;"><img src="' + image_url_club + '" style="height: 100%; width: 100%; display: block; object-fit: contain;"></li>');
                        }
                    });

                }
                /******************************************/
                jQuery('div.field_personnalisation input.input-text').keyup(function () {
                    jQuery(this).val(jQuery(this).val().toUpperCase());
                });
                jQuery('button#product-addtocart-button').click(function (e) {
                    var modal = false;
                    jQuery('input:radio.product-custom-option:checked,select.product-custom-option,input:text.product-custom-option').each(function () {
                        if (jQuery('input.input-text.product-custom-option.club').val() != '' && typeof (jQuery('select.product-custom-option').val()) === "undefined") {
                            e.preventDefault();
                            require(['Magento_Ui/js/modal/confirm'], function (confirmation) {
                                confirmation({
                                    title: modal_title,
                                    content: modal_content,
                                    actions: {
                                        confirm: function () {
                                            location.reload(true);
                                        },
                                        cancel: function () {
                                            location.reload(true)
                                        }
                                    }
                                });
                            });
                        } else if (jQuery(this).val() != "" && jQuery(this).val() != null && jQuery('#product_addtocart_form').valid()) {
                            modal = true;
                        }

                    });
                    if (modal == true) {
                        e.preventDefault();
                        require(['Magento_Ui/js/modal/confirm'], function (confirmation) {
                            var content = "";
                            var select = {};
                            select.i = [];
                            var text = {};
                            text.i = [];
                            var radio = {};
                            radio.i = [];
                            var checkbox = {};
                            checkbox.i = [];

                            content += '<div class="modalProductOption">'
                                + '<div class="optionProductLabel">' + jQuery('h1.page-title span.base').text() + '</div>'
                                + '<div class="optionProductPrice">' + modal_formated_price + '</div>'
                                + '</div>';

                            jQuery('input:text.product-custom-option').each(function (i) {
                                if (jQuery(this) && jQuery(this).val() != "") {
                                    text.i["value"] = jQuery(this).val();
                                    if (jQuery(this).parent().parent().attr('id') == 'option-type-text-name') {
                                        text.i["id"] = jQuery(this).parent().parent().attr('id');
                                        text.i["label"] = jQuery('#option-type-text-name').find('label').first().text().split('(', 1)[0].trim().split(' ', 1)[0].trim() + ' ';
                                        text.i["price"] = jQuery('#option-type-text-name').find('label').text().split('(', 2)[1].split(')', 1)[0];
                                    } else if (jQuery(this).parent().parent().attr('id') == 'option-type-text-club') {
                                        text.i["id"] = jQuery(this).parent().parent().attr('id');
                                        text.i["label"] = jQuery('#label-select-club').find('span').first().text().split('    ', 1) + ' ';
                                        if (jQuery(this).parents().prev('label').text().indexOf(':') == -1) {
                                            text.i["price"] = jQuery(this).parents().prev('label').text().split('(', 2)[1].split(')', 1)[0];
                                        } else {
                                            text.i["price"] = jQuery(this).parents().prev('label').text().split(':', 2)[1].split(')', 1)[0];
                                        }
                                    } else {
                                        text.i["id"] = jQuery(this).parent().parent().attr('id');
                                        text.i["label"] = jQuery(this).parent().prev('label').text().split('(', 1)[0].trim().split('\n', 1)[0].trim() + ' ';
                                        text.i["price"] = jQuery(this).parent().prev('label').text().split('(', 2)[1].split(')', 1)[0];
                                    }
                                    content += '<div id="modal-' + text.i["id"] + '" class="modalOption">'
                                        + '<span class="optionLabel">' + text.i["label"] + '</span>'
                                        + '<span class="optionValue">' + text.i["value"] + '</span>';
                                    typeof (text.i["price"]) !== "undefined" ? content += '<span class="optionPrice">' + text.i["price"] + '<span>' : "";
                                    content += '</div>';
                                }
                            });
                            jQuery('select.product-custom-option option:selected').each(function (i) {
                                if (jQuery(this) && jQuery(this).val() != "") {
                                    select.i["id"] = jQuery(this).parent().parent().attr('id');
                                    select.i['label'] = jQuery(this).parents().prev('label').text().split('(', 1)[0] + ' ';
                                    select.i['value'] = jQuery(this).text().split('+', 1)[0];
                                    select.i['price'] = jQuery(this).parents().prev('label').text().replace(/\n/g, '').split('(', 2)[1].split(')', 1)[0].trim();

                                    content += '<div id="modal-' + select.i["id"] + '" class="modalOption">'
                                        + '<span class="optionLabel">' + select.i["label"] + '</span>'
                                        + '<span class="optionValue">' + select.i["value"] + '</span>';
                                    typeof (select.i['price']) !== "undefined" ? content += '<span class="optionPrice">' + select.i['price'] + '<span>' : "";
                                    content += '</div>';
                                }
                            });
                            jQuery('input:radio.product-custom-option:checked').each(function (i) {
                                if (jQuery(this) && jQuery(this).val() != "") {
                                    radio.i["id"] = jQuery(this).parent().parent().attr('id');
                                    radio.i['label'] = jQuery(this).parents().prev('label').find('span').first().text() + ' ';
                                    radio.i['value'] = jQuery(this).next('label').text().split('+', 1)[0];
                                    radio.i['price'] = jQuery(this).next('label').text().split('+', 2)[1];
                                    content += '<div id="modal-' + radio.i["id"] + '" class="modalOption">'
                                        + '<span class="optionLabel">' + radio.i["label"] + '</span>'
                                        + '<span class="optionValue">' + radio.i["value"] + '</span>';
                                    typeof (radio.i['price']) !== "undefined" ? content += '<span class="optionPrice">' + radio.i['price'] + '<span>' : "";
                                    content += '</div>';
                                }
                            });
                            jQuery('input:checkbox.product-custom-option:checked').each(function (i) {
                                if (jQuery(this) && jQuery(this).val() != "") {
                                    checkbox.i["id"] = jQuery(this).parent().parent().attr('id');
                                    checkbox.i['label'] = jQuery(this).parents().prev('label').find('span').first().text() + ' ';
                                    checkbox.i['value'] = jQuery(this).next('label').text().split('+', 1)[0];
                                    checkbox.i['price'] = jQuery(this).next('label').text().split('+', 2)[1];
                                    content += '<div id="modal-' + checkbox.i["id"] + '" class="modalOption">'
                                        + '<span class="optionLabel">' + checkbox.i["label"] + '</span>'
                                        + '<span class="optionValue">' + checkbox.i["value"] + '</span>';
                                    typeof (checkbox.i['price']) !== "undefined" ? content += '<span class="optionPrice">' + checkbox.i['price'] + '<span>' : "";
                                    content += '</div>';
                                }
                            });
                            content += '<div class="modalBorderTopTotal"></div>';
                            content += '<div class="modalTotal">'
                                + '<span class="optionTotal">' + modal_total_text + '</span>'
                                + '<span class="optionTotalPrice">' + jQuery('[data-price-type="finalPrice"]').find('span').first().text() + '<span class="totalTTC">' + modal_ttc_text + '</span></span>'
                                + '</div>';
                            if (modal_warning_conditions) {
                                content += '<div class="warningValidPerso">'
                                    + '<span class="span_warning_valid_perso" style="display: inline-flex;"><div class="container-circle-oreca"><div class="div-circle-oreca"><div class="i-oreca"></div></div></div><p class="warning_valid_perso_modal" >' + modal_warning_content + '</p></span>'
                                    + '</div>';
                            }
                            confirmation({
                                title: modal_confirmation_title,
                                content: content,
                                actions: {
                                    confirm: function () {
                                        jQuery('#product_addtocart_form').submit();
                                    },
                                    cancel: function () {
                                    },
                                    always: function () {
                                    }
                                },
                            });
                            jQuery('footer.modal-footer button.action-primary').text(modal_confirmation_text);
                            jQuery('footer.modal-footer button.action-secondary.action-dismiss').insertAfter('footer.modal-footer button.action-primary');
                            jQuery('#modal-option-type-text-club').appendTo(jQuery('.modalBorderTopTotal'))
                        });
                    }
                });
            });

            function show_previsu() {
                var positionPrevisuBlocks = {
                    "name": 1,
                    "number": 2,
                    "club": 3
                };

                var htmlArray = [
                    "<div id='previsu_perso' style='display:flex;flex-flow:column;align-items:center;justify-content:center;width:100%;max-width:650px;height:100%;z-index:99999;position:relative;margin:0 auto;'>",
                    "<div id='previsu_name' style='width:100%;height:" + heightName + "%;padding-bottom:1%;margin:" + marginTopName + "% 0 0 " + marginLeftName + "%;'><ul id ='ul_previsu_name' style='width:auto!important;height:100%;display:flex;justify-content:center;text-decoration:none;list-style:none;margin:0;padding:0;line-height:1;text-align:center;opacity:1;'></ul></div>",
                    "<div id='previsu_number' style='width:26%;height:" + heightNumber + "%;padding-bottom:2%;margin:" + marginTopNumber + "% 0 0 " + marginLeftNumber + "%;'><ul id ='ul_previsu_number' style='height:100%;display:flex;justify-content:center;color:black;font-size:6em;text-decoration:none;list-style:none;margin:0;padding:0;line-height:1;text-align:center;'></ul></div>",
                    "<div id='previsu_club' style='width:100%;height:" + heightClub + "%;margin-bottom:9%;'><ul id ='ul_previsu_club' style='width:100%;height:100%;display:flex;align-items:flex-start;color:black;font-size:0.5em;text-decoration:none;list-style:none;padding:0;margin:" + marginTopClub + "% 0 0 " + marginLeftClub + "%;line-height:1;text-align:center;'></ul></div>",
                    "</div>"
                ];

                var html = htmlArray.join(" ");
                jQuery(html).insertAfter('div.fotorama__stage__frame.fotorama_vertical_ratio.fotorama__loaded.fotorama__active');
            }

            function hide_previsu() {
                jQuery("#previsu_perso, #previsu_name, #previsu_number, #previsu_club").remove();
            }

            function getImageLetterNameprevisu(caractere) {
                return "pub/media"
            }

            function preload(arrayOfImages) {
                $(arrayOfImages).each(function () {
                    $('<img/>')[0].src = this;
                });
            }
        }

    });
    return $.personnaliastion.checkbox_personnaliser;
});
