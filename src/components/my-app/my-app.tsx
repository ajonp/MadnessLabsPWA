import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';

import { DatabaseService } from '../../services/Database';
import { AuthService } from '../../services/Auth';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  Database: DatabaseService;
  Auth: AuthService;

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentDidLoad() {
    this.Database = new DatabaseService;
    this.Auth = new AuthService;

    this.Auth.onAuthChanged((data) => {
      // If User is logged in
      console.log('Auth Data', data);
    });

    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a 
      new version available. When they click the
      reload button it then reloads the page 
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        toast.present();
      });
    })
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>

            <stencil-route url='/apps' component='app-apps'>
            </stencil-route>

            <stencil-route url='/profile/:name' component='app-profile'>
            </stencil-route>
          </stencil-router>
        </main>
      </ion-app>
    );
  }
}
