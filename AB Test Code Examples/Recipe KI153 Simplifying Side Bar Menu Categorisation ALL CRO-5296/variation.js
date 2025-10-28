(function () {
    try {
        /* main variables */
        var debug = 0;
        var variation_name = "cro-t-sideBar-ki153";

        function waitForElement(selector, trigger) {
            var interval = setInterval(function () {
                if (
                    document &&
                    document.querySelector(selector) &&
                    document.querySelectorAll(selector).length > 0
                ) {
                    clearInterval(interval);
                    trigger();
                }
            }, 50);
            setTimeout(function () {
                clearInterval(interval);
            }, 15000);
        }

        function live(selector, event, callback, context) {
            function addEvent(el, type, handler) {
                if (el.attachEvent) el.attachEvent("on" + type, handler);
                else el.addEventListener(type, handler);
            }
            this &&
                this.Element &&
                (function (ElementPrototype) {
                    ElementPrototype.matches =
                        ElementPrototype.matches ||
                        ElementPrototype.matchesSelector ||
                        ElementPrototype.webkitMatchesSelector ||
                        ElementPrototype.msMatchesSelector ||
                        function (selector) {
                            var node = this,
                                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                                i = -1;
                            while (nodes[++i] && nodes[i] != node);
                            return !!nodes[i];
                        };
                })(Element.prototype);

            function live(selector, event, callback, context) {
                addEvent(context || document, event, function (e) {
                    var found,
                        el = e.target || e.srcElement;
                    while (el && el.matches && el !== context && !(found = el.matches(selector))) el = el.parentElement;
                    if (found) callback.call(el, e);
                });
            }
            live(selector, event, callback, context);
        }

        function addClass(el, cls) {
            var el = document.querySelector(el);
            if (el) {
                el.classList.add(cls);
            }
        }

        function init() {
            addClass("body", variation_name);
            filterUpdate();
            lastChild();
            checkedForOpen();

        }

        function filterUpdate() {
            var style = document.createElement('style');
            style.innerHTML = `
                ul.items.filter-checkbox li.child { display: none; }
                ul.items.filter-checkbox li.child.show { display: block; padding-left: 15px; }
                ul.items.filter-checkbox > li:not(.child) { cursor: pointer; }`;
            document.head.appendChild(style);

            waitForElement('#layered-filter-block .filter-current .items', function () {

                document.querySelectorAll('#layered-filter-block .filter-current .items .filter-label').forEach(function (e) {
                    var parent = e.closest('.item')
                    if (e.innerHTML.indexOf('Category') != -1) {
                        parent.classList.add('cro-t-153-Category')
                    }
                })

                var filterEl = document.querySelector('#layered-filter-block .filter-current .items .filter-value');

                if (filterEl) {
                    var text = filterEl.textContent;
                    // Replace commas with newlines
                    var newText = text.replace(/,\s*/g, '\n');
                    filterEl.textContent = newText;
                }

            });
        }

        function lastChild() {
            waitForElement('#layered-filter-block .filter-options .items.filter-checkbox li', function () {
                var items = document.querySelectorAll('body.recipe_124 #layered-filter-block .filter-options .items.filter-checkbox li.child.show');
                if (items.length > 0) {
                    items[items.length - 1].classList.add('last-visible-show');
                }

                var lis = document.querySelectorAll('#layered-filter-block .filter-options .items.filter-checkbox li');

                lis.forEach(function (li, i) {
                    var nextLi = lis[i + 1];

                    // ✅ Only add if current li is NOT child AND next li is NOT child
                    if (!li.classList.contains('child') && (!nextLi || !nextLi.classList.contains('child'))) {
                        li.classList.add('cro-t-153-no-child');
                    }
                });
            });



        }

        // function croEventHandkler() {
        //     // Handle parent click
        //     live('ul.items.filter-checkbox > li:not(.child)', 'click', function (e) {
        //         this.classList.toggle('active');
        //         var next = this.nextElementSibling;
        //         while (next && next.classList.contains('child')) {
        //             next.classList.toggle('show');
        //             next = next.nextElementSibling;
        //         }
        //     });

        //     // Handle child click → keep parent active
        //     live('ul.items.filter-checkbox li.child', 'click', function () {
        //         var parent = this.previousElementSibling;
        //         while (parent && parent.classList.contains('child')) {
        //             parent = parent.previousElementSibling;
        //         }
        //         if (parent && !parent.classList.contains('active')) {
        //             parent.classList.add('active');
        //         }
        //     });
        // }

        function customLabelHandler() {
            // Prevent default filter behavior on label clicks
            live('.filter-options .filter-options-item.cat .filter-options-content li:not(.child) label', 'click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                // Trigger your custom sidebar toggle behavior
                var li = this.closest('li');
                if (li) {
                    li.classList.toggle('active');
                    // Optional: if your custom show/hide for child depends on li structure
                    var next = li.nextElementSibling;
                    while (next && next.classList.contains('child')) {
                        next.classList.toggle('show');
                        next = next.nextElementSibling;
                    }
                }
                lastChild();
            });

            live('.filter-options .filter-options-item.cat .filter-options-content li span.cdz-checkbox-wrap', 'click', function (e) {
                checkedForOpen()
            });

            // live('.filter-options .filter-options-item.cat .filter-options-content li.child label', 'click', function (e) {
            //     var checkboxWrap = this.previousElementSibling;
            //     if (checkboxWrap) {
            //         checkboxWrap.click();
            //     }
            // });
        }

        function checkedForOpen() {
            /// exist: .filter-options .filter-options-item.cat .filter-options-content li input[checked]
            // loop: .filter-options .filter-options-item.cat .filter-options-content li input[checked]
            // check for parent li and add 'active' class on that parent li and then check for child li and add 'show' class on that child li
            var checkedInputs = document.querySelectorAll('.filter-options .filter-options-item.cat .filter-options-content li input:checked');

            checkedInputs.forEach(function (input) {
                var currentLi = input.closest('li');
                if (currentLi) {
                    if (currentLi.classList.contains('child')) {
                        // ✅ If the checked input is inside a child <li>,
                        // find its parent <li> by going upwards through previousElementSibling
                        var parentLi = currentLi.previousElementSibling;
                        while (parentLi && parentLi.classList.contains('child')) {
                            parentLi = parentLi.previousElementSibling;
                        }
                        if (parentLi) {
                            parentLi.classList.add('active');
                        }

                        // ✅ Show this child and all sibling child lis under the same parent
                        var sibling = parentLi ? parentLi.nextElementSibling : null;
                        while (sibling && sibling.classList.contains('child')) {
                            sibling.classList.add('show');
                            sibling = sibling.nextElementSibling;
                        }

                    }
                }
            });


        }

        if (!window.cro_t_20) {
            customLabelHandler();
            window.cro_t_20 = true;
        }

        waitForElement('#narrow-by-list .filter-options-item.cat', init);

    } catch (e) {
        if (debug) console.log(e, "error in Test" + variation_name);
    }
})();