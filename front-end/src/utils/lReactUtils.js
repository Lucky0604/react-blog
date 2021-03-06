let l = function(elem) {
    return new l.prototype.init(elem);
}

// dom methods
l.prototype = {
    init(elem) {
        this.elem = elem;
        return this;
    },

    on(type, eventHandle) {
        let elem = this.elem;
        if (elem.addEventListener) {
            elem.addEventListener(type, eventHandle, false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on" + type, eventHandle);
        }
    },
    off(type, eventHandle) {
        let elem = this.elem;
        if (elem.removeEventListener) {
            elem.removeEventListener(type, eventHandle, false);
        } else if (elem.detachEvent) {
            elem.detachEvent("on" + type, eventHandle);
        }
    },
    getByClass(className) {
        let children = this.elem.getElementsByTagName('*'),
            ret = [],
            reg = new RegExp('\\b' + className + '\\b', 'i'),
            i = 0;
        for (; i < children.length; i ++) {
            reg.test(children[i].className) && ret.push(children[i]);
        }

        return ret;
    }
};

l.prototype.init.prototype = l.prototype;

// main methods
l.createScript = function(url, cb) {
    var head = document.getElementsByTagName('head')[0],
        script = document.createElement('script');

    script.type = 'text/javascript';
    script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            cb();
            script.onload = script.onreadystatechange = null;       // Handle memory leak in IE
        }
    };
    script.src = url;
    head.appendChild(script);
}

l.createStyle = function(url) {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
}

export default l;
