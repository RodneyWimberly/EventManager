import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeInOut } from '../../helpers/animations';
import { AuthProviders } from '../../models/user-login.model';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { ConfigurationService } from '../../services/configuration.service';
import { AuthEndpointService, UserViewModel } from '../../services/endpoint.services';

@Component({
  selector: 'login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss'],
  animations: [fadeInOut]
})

export class LoginRedirectComponent implements OnInit, OnDestroy {
  constructor(private alertService: AlertService, private authService: AuthEndpointService, public configurations: ConfigurationService) {

  }
  ngOnInit(): void {
    this.authService.oAuthService.configure(this.configurations.authConfig);
    this.authService.oAuthService.loadDiscoveryDocumentAndLogin({ disableOAuth2StateCheck: true, preventClearHashAfterLogin: false }).then(success => {
      if (success && this.authService.oAuthService.hasValidAccessToken) {
        this.authService.oAuthService.setupAutomaticSilentRefresh();
        let user: UserViewModel = this.authService.processLoginResponse(this.authService.oAuthService.getIdToken(), true);
        this.alertService.showMessage(`Welcome ${user.userName}!`);
        this.authService.gotoHomePage();
      }
      else {
        this.alertService.showStickyMessage("Error logging into Auth Provider")
        this.authService.gotoPage("login");
      }
    });
  }

  ngOnDestroy(): void {
  }


}
