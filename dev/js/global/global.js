var globalJS = (function () {
    'use strict';

    var practicePage,
        navBarLinks,
        pageLinks,
        modalBtn,
        closeBtn,
        form,
        validationRules = {
            required: function (elem) {
                return (elem.type === 'checkbox' && elem.checked) || (elem.type !== 'checkbox' && elem.value !== '');
            },
            email: function (value) {
                var regexEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

                return regexEmail.test(value);
            }
        };

        function _validateFields(e) {
            var el = e.target || e,
            requiredValidation,
            field;

            if (el.type !== 'hidden' && el.type !== 'submit') {
                requiredValidation = el.getAttribute('required') === null ? true : validationRules['required'](el);

                if (!requiredValidation || ((el.value !== '') && validationRules[el.type] && !validationRules[el.type](el.value))) {
                    el.closest('div').classList.add('error');
                } else {
                    el.closest('div').classList.remove('error');
                }
            }
        }

    //Helper function to validate forms - Stole!

    // Helper function to attach DOM events - Stole!
    function _attachEvents(elem, event, fn) {
        if ((event && (typeof event === 'string' || typeof event === 'object')) && (elem) && (fn && typeof fn === 'function')) {
            if (typeof event === 'string') {
                if (NodeList.prototype.isPrototypeOf(elem)) {
                    elem.forEach(function(el) {
                        el.addEventListener(event, fn, false);
                    });
                } else {
                    elem.addEventListener(event, fn, false);
                }
            } else {
                event.forEach(function(ev) {
                    if (NodeList.prototype.isPrototypeOf(elem) && typeof ev === 'string') {
                        elem.forEach(function(el) {
                            el.addEventListener(ev, fn, false);
                        });
                    } else if (typeof ev === 'string') {
                        elem.addEventListener(ev, fn, false);
                    }
                });
            }
        }
    }

    function _navBarNavigation(e) {
        //TODO: Navigation code here

        e.preventDefault();
    }

    function _displayModal(e){
        var modalWindow = practicePage.querySelector('.c-modal'),
            modalTrigger = e.target.getAttribute('data-modal-target'),
            modalContent = practicePage.querySelector(modalTrigger);

        modalWindow.classList.toggle('show-modal');
        modalContent.classList.toggle('in');
        modalContent.classList.toggle('show');

    }

    function _validateSubmit(e) {
        e.preventDefault();

        form.elements.forEach(function (elem) {
            _validateFields(elem);
        });
    }

    // Public methods
    function init() {
        practicePage = document.querySelector('.p-practice');
        navBarLinks = practicePage.querySelectorAll('.c-nav a');
        pageLinks = practicePage.querySelectorAll('.c-products a');
        modalBtn = practicePage.querySelectorAll('.btn-open-modal');
        closeBtn = practicePage.querySelectorAll('.close');
        form = practicePage.querySelector('.c-form');

        _attachEvents(navBarLinks, 'click', _navBarNavigation);
        _attachEvents(pageLinks, 'click', _navBarNavigation);
        _attachEvents(modalBtn, 'click', _displayModal);
        _attachEvents(closeBtn, 'click', _displayModal);
        _attachEvents(form, 'submit', _validateSubmit);
    }

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', globalJS.init);
