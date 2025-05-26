import {Component, ViewEncapsulation} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {
  Control,
  control,
  latLng,
  LeafletEvent,
  Map,
  tileLayer,
} from 'leaflet';


@Component({
  selector: 'app-root',
  imports: [LeafletModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None   // ← ajoutez ceci

})
export class AppComponent {
  title = 'BCSOMAP';
  map: Map

  AtlasMap = tileLayer('/assets/mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'AtlasStyle map',
  });
  GridMap = tileLayer('/assets/mapStyles/styleGrid/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'GridStyle map',
  });
  SatelliteMap = tileLayer('/assets/mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'SatelliteStyle map',
  });

  options = {
    layers: [this.AtlasMap],
    zoom: 3,
    maxZoom: 5,
    minZoom: 0,
    center: latLng(0, 0),
    noWrap: true,
    maxBoundsViscosity: 1
  };

  layersControl = {
    baseLayers: {
      AtlasMap: this.AtlasMap,
      GridMap: this.GridMap,
      SatelliteMap: this.SatelliteMap,
    },
    overlays: {},
  };

  clickEvent(event: LeafletEvent): void {
    console.log(event);
  }
  onMapReady(map: Map): void {
    this.map = map;

    // @ts-ignore
    // const legend = control({ position: 'bottomright' });
    const legend = new Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = document.createElement('div');
      div.className = 'info legend';
      div.innerHTML = `<div class="legend-credit">Made in BCSO</div>`;
      return div;
    };
    legend.addTo(this.map);
  }

}
