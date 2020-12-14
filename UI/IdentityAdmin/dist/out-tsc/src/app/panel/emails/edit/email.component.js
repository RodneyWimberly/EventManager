import { __decorate } from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProblemDetails } from '@shared/viewModel/default-response.model';
import { Bcc, Email, Sender } from '@shared/viewModel/email.model';
import { ToasterConfig } from 'angular2-toaster';
import * as CodeMirror from 'codemirror';
let EmailComponent = class EmailComponent {
    constructor(translator, emailService, toasterService) {
        this.translator = translator;
        this.emailService = emailService;
        this.toasterService = toasterService;
        this.toasterconfig = new ToasterConfig({
            positionClass: 'toast-top-right',
            showCloseButton: true,
            timeout: 60000
        });
        this.editorConfig = {
            editable: true,
            sanitize: false
        };
        this.linkForThemes = null;
        this.editorThemes = ['3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse',
            'elegant', 'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix', 'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'];
        this.editorOpts = {
            mode: 'htmlmixed',
            lineNumbers: true,
            matchBrackets: true,
            theme: 'mbo',
            viewportMargin: Infinity
        };
    }
    ngOnInit() {
        this.errors = [];
        this.model = new Email();
        this.emailTypes$ = this.emailService.getEmailTypes();
        this.instance = CodeMirror.fromTextArea(this.editor.nativeElement, this.editorOpts);
        this.updateEditor();
        this.instance.on('change', () => {
            this.model.content = this.instance.getValue();
        });
        this.loadTheme(); // load default theme
    }
    updateEditor() {
        setTimeout(() => {
            this.instance.setValue(this.model.content);
        }, 500);
    }
    createCSS(path) {
        let link = document.createElement('link');
        link.href = path;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.id = 'cm_theme';
        return document.getElementsByTagName('head')[0].appendChild(link);
    }
    getEmailTemplate($event) {
        this.emailService.getEmail($event.value).subscribe(s => {
            if (s.bcc == null)
                s.bcc = new Bcc();
            if (s.sender == null)
                s.sender = new Sender();
            this.model = s;
            this.updateEditor();
            this.editorOpts.mode = "htmlmixed";
            this.errors = [];
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
        });
    }
    update() {
        this.showButtonLoading = true;
        this.emailService.update(this.selectedType, this.model).subscribe(() => {
            this.showSuccessMessage();
            this.showButtonLoading = false;
        }, err => {
            this.errors = ProblemDetails.GetErrors(err).map(a => a.value);
            this.showButtonLoading = false;
        });
    }
    showSuccessMessage() {
        this.translator.translate.get('toasterMessages').subscribe(a => {
            this.toasterService.pop("success", a["title-success"], a["message-success"]);
        });
    }
    loadTheme() {
        let themesBase = 'assets/codemirror/theme/';
        if (!this.linkForThemes) {
            this.linkForThemes = this.createCSS(themesBase + this.editorOpts.theme + '.css');
        }
        else {
            this.linkForThemes.setAttribute('href', themesBase + this.editorOpts.theme + '.css');
        }
        this.instance.setOption('theme', this.editorOpts.theme);
    }
};
__decorate([
    ViewChild('editor', { static: true })
], EmailComponent.prototype, "editor", void 0);
EmailComponent = __decorate([
    Component({
        selector: "app-email",
        templateUrl: "./email.component.html",
        styleUrls: ["./email.component.scss"],
        encapsulation: ViewEncapsulation.None
    })
], EmailComponent);
export { EmailComponent };
//# sourceMappingURL=email.component.js.map