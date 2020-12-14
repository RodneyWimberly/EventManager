import { __decorate } from "tslib";
import { Component } from "@angular/core";
let SidebarComponent = class SidebarComponent {
    constructor(menu, settings, router) {
        this.menu = menu;
        this.settings = settings;
        this.router = router;
        this.sbclickEvent = "click.sidebar-toggle";
        this.$doc = null;
        this.menuItems = menu.getMenu();
    }
    ngOnInit() {
        this.router.events.subscribe((val) => {
            // close any submenu opened when route changes
            this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
            // close sidebar on route change
            this.settings.layout.asideToggled = false;
        });
        // enable sidebar autoclose from extenal clicks
        this.anyClickClose();
    }
    anyClickClose() {
        this.$doc = $(document).on(this.sbclickEvent, (e) => {
            if (!$(e.target).parents(".aside-container").length) {
                this.settings.layout.asideToggled = false;
            }
        });
    }
    ngOnDestroy() {
        if (this.$doc)
            this.$doc.off(this.sbclickEvent);
    }
    toggleSubmenuClick(event) {
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            event.preventDefault();
            let target = $(event.target || event.srcElement || event.currentTarget);
            let ul, anchor = target;
            // find the UL
            if (!target.is("a")) {
                anchor = target.parent("a").first();
            }
            ul = anchor.next();
            // hide other submenus
            let parentNav = ul.parents(".sidebar-subnav");
            $(".sidebar-subnav").each((idx, el) => {
                let $el = $(el);
                // if element is not a parent or self ul
                if (!$el.is(parentNav) && !$el.is(ul)) {
                    this.closeMenu($el);
                }
            });
            // abort if not UL to process
            if (!ul.length) {
                return;
            }
            // any child menu should start closed
            ul.find(".sidebar-subnav").each((idx, el) => {
                this.closeMenu($(el));
            });
            // toggle UL height
            if (parseInt(ul.height(), 0)) {
                this.closeMenu(ul);
            }
            else {
                // expand menu
                ul.on("transitionend", () => {
                    ul.height("auto").off("transitionend");
                }).height(ul[0].scrollHeight);
                // add class to manage animation
                ul.addClass("opening");
            }
        }
    }
    // Close menu collapsing height
    closeMenu(elem) {
        elem.height(elem[0].scrollHeight); // set height
        elem.height(0); // and move to zero to collapse
        elem.removeClass("opening");
    }
    toggleSubmenuHover(event) {
        let self = this;
        if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
            event.preventDefault();
            this.removeFloatingNav();
            let target = $(event.target || event.srcElement || event.currentTarget);
            let ul, anchor = target;
            // find the UL
            if (!target.is("a")) {
                anchor = target.parent("a");
            }
            ul = anchor.next();
            if (!ul.length) {
                return; // if not submenu return
            }
            let $aside = $(".aside-container");
            let $asideInner = $aside.children(".aside-inner"); // for top offset calculation
            let $sidebar = $asideInner.children(".sidebar");
            let mar = parseInt($asideInner.css("padding-top"), 0) + parseInt($aside.css("padding-top"), 0);
            let itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();
            let floatingNav = ul.clone().appendTo($aside);
            let vwHeight = $(window).height();
            // let itemTop = anchor.position().top || anchor.offset().top;
            floatingNav
                .removeClass("opening") // necesary for demo if switched between normal//collapsed mode
                .addClass("nav-floating")
                .css({
                position: this.settings.layout.isFixed ? "fixed" : "absolute",
                top: itemTop,
                bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : "auto"
            });
            floatingNav
                .on("mouseleave", () => { floatingNav.remove(); })
                .find("a").on("click", function (e) {
                e.preventDefault(); // prevents page reload on click
                // get the exact route path to navigate
                let routeTo = $(this).attr("route");
                if (routeTo)
                    self.router.navigate([routeTo]);
            });
            this.listenForExternalClicks();
        }
    }
    listenForExternalClicks() {
        let $doc = $(document).on("click.sidebar", (e) => {
            if (!$(e.target).parents(".aside-container").length) {
                this.removeFloatingNav();
                $doc.off("click.sidebar");
            }
        });
    }
    removeFloatingNav() {
        $(".nav-floating").remove();
    }
    isSidebarCollapsed() {
        return this.settings.layout.isCollapsed;
    }
    isSidebarCollapsedText() {
        return this.settings.layout.isCollapsedText;
    }
    isEnabledHover() {
        return this.settings.layout.asideHover;
    }
};
SidebarComponent = __decorate([
    Component({
        selector: "app-sidebar",
        templateUrl: "./sidebar.component.html",
        styleUrls: ["./sidebar.component.scss"]
    })
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map