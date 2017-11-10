/**
 * TNW Scroll
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

const pluginName = "tnwTabs"

class TNWTabs {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init() {
        this.$tabs = this.$el.find("[role='tab']")
        this.$tabPanels = this.$el.find("[role='tabpanel']")

        // Set click event handler
        this.$tabs.on(this.options.eventNameClick, this.onClickTab.bind(this))
    }

    onClickTab(e) {
        e.preventDefault()

        let $tab
        let $tabPanel

        $tab = $(e.target)
        $tabPanel = this.$tabPanels.filter("#" + $tab.attr("aria-controls")).first()

        // Deactivate all tabs
        this.$tabs.attr("aria-selected", false)

        // Active active tab
        $tab.attr("aria-selected", true)

        // Hide all tab panels
        this.$tabPanels.attr("aria-hidden", true)

        // Unhide active tab panel
        $tabPanel.attr("aria-hidden", false)
    }
}

TNWTabs.prototype.defaults = {
    eventNameClick: $("html").hasClass("touchevents") ? "touchstart" : "click"
}

$.fn[pluginName] = function (options) {
    return this.each(function () {
        let instance = $(this).data(pluginName)

        if (!instance) {
            $(this).data(pluginName, new TNWTabs(this, options))
        } else {
            if (typeof options === "string") {
                instance[options]()
            }
        }
    })
}