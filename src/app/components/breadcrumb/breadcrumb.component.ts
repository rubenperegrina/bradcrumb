import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Input } from "@angular/core";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  public deliminator: string = ">";

  breadcrumbs!: Array<{ label: string; url: string }>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.breadcrumbs = [];
        let currentRoute: any = this.activatedRoute.root,
          url = "";
        do {
          const childrenRoutes = currentRoute.children;
          currentRoute = null;
          childrenRoutes.forEach((route: { outlet: string; snapshot: { data: { breadCrum: any; }; }; }) => {
            if (route.outlet === "primary") {
              const routeSnapshot: any = route.snapshot;

              url +=
                "/" + routeSnapshot['url'].map((segment: { path: any; }) => segment.path).join("/");
              this.breadcrumbs.push({
                label: route.snapshot.data.breadCrum,
                url: url
              });

              currentRoute = route;
            }
          });
        } while (currentRoute);
      });
  }

}