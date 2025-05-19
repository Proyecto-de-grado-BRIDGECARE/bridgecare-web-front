import { Component, OnInit } from '@angular/core';
import { AlertaServiceService } from '../../../services/bridge-services/alert-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { alerta } from '../../../../models/bridge/alerta';

@Component({
  selector: 'app-table-alerts',
  imports: [
    CommonModule
  ],
  templateUrl: './table-alerts.component.html',
  styleUrl: './table-alerts.component.css'
})
export class TableAlertsComponent implements OnInit {
  alertas: alerta[] = [];
  inspeccionId!: number;

  constructor(
    private alertaService: AlertaServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inspeccionId = Number(this.route.snapshot.paramMap.get('inspeccionId'));
    console.log('🔍 inspectionId: ', this.inspeccionId);
    this.alertaService.obtenerAlertasInspeccion(this.inspeccionId).subscribe(data => {
      this.alertas = data;
    });
    if (!this.inspeccionId || this.inspeccionId === 0) {
      console.error('❌ ID de inspección inválido');
      return;
    }
    console.log(this.alertas);
  }

  getTipoClase(tipo: string): string {
    switch (tipo.toLowerCase()) {
      case 'crítica':
        return 'bg-danger text-white fw-bold';
      case 'alta':
        return 'bg-warning text-dark fw-bold';
      case 'media':
        return 'bg-info text-dark';
      case 'baja':
        return 'bg-success text-white';
      default:
        return '';
    }
  }
}
