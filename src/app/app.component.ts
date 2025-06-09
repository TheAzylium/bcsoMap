import {Component, ViewEncapsulation} from '@angular/core';
import {LeafletModule} from '@bluehalo/ngx-leaflet';
import {
  Control,
  icon, Icon,
  latLng, LayerGroup,
  LeafletEvent,
  Map, marker,
  tileLayer,
} from 'leaflet';
import {Electronic} from './markers/electronic';
import {Ores} from './markers/ores';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [LeafletModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None   // ← ajoutez ceci

})
export class AppComponent {
  title = 'BCSOMAP';
  map: Map
  electronic: LayerGroup = new LayerGroup();
  ores: LayerGroup = new LayerGroup();

  showElectronic = true;
  showOres = true;

  AtlasMap = tileLayer('assets/mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'AtlasStyle map',
    // errorTileUrl: '/assets/mapStyles/styleAtlas/empty.jpg'
  });
  GridMap = tileLayer('assets/mapStyles/styleGrid/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'GridStyle map',
    // errorTileUrl: '/assets/mapStyles/styleGrid/empty.png'
  });
  SatelliteMap = tileLayer('assets/mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'SatelliteStyle map',
    // errorTileUrl: '/assets/mapStyles/styleSatelite/empty.jpg'
  });


  options = {
    layers: [this.AtlasMap],
    zoom: 3,
    maxZoom: 5,
    minZoom: 0,
    center: latLng(0, 0),
    noWrap: true,
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
    const legend = new Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = document.createElement('div');
      div.className = 'info legend';
      div.innerHTML = `<div class="legend-credit">Made in BCSO</div>`;
      return div;
    };
    legend.addTo(this.map);

    this.setElectronic();
    this.setOres()
  }

  private setElectronic() {
    Electronic.forEach(m => {
      this.electronic.addLayer(
        marker(latLng(m.lat, m.lng), {
          title: m.name,
          icon: icon({
            ...Icon.Default.prototype.options,
            iconUrl: 'assets/icons/electronic.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        }).bindTooltip(
          m.name,
          {
            permanent: true,
            direction: 'right',
            offset: [10, 0],
            className: 'marker-label electronic-label'

          }
        )
      );
    });
    this.map.addLayer(this.electronic);
  }

  private setOres() {
    Ores.forEach(m => {
      this.ores.addLayer(
        marker(latLng(m.lat, m.lng), {
          title: m.name,
          icon: icon({
            ...Icon.Default.prototype.options,
            iconUrl: 'assets/icons/ores.png',
            shadowUrl: 'assets/marker-shadow.png'

          }),

        }).bindTooltip(
          m.name,
          {
            permanent: true,
            direction: 'right',
            offset: [10, 0],
            className: 'marker-label ore-label'
          }
        )
      );
    });
    this.map.addLayer(this.ores);
  }

  toggleElectronic() {
    this.showElectronic = !this.showElectronic;
    if (this.showElectronic) {
      this.map.addLayer(this.electronic);
    } else {
      this.map.removeLayer(this.electronic);
    }
  }

  toggleOres() {
    this.showOres = !this.showOres;
    if (this.showOres) {
      this.map.addLayer(this.ores);
    } else {
      this.map.removeLayer(this.ores);
    }
  }
}
