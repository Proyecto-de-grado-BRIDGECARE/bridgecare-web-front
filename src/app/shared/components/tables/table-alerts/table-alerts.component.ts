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
    const rawId = this.route.snapshot.paramMap.get('inspectionId');
    this.inspeccionId = Number(rawId);

    console.log('🔍 inspectionId:', this.inspeccionId);

    if (!this.inspeccionId || this.inspeccionId === 0 || isNaN(this.inspeccionId)) {
      console.error('❌ ID de inspección inválido');
      return;
    }

    this.alertaService.obtenerAlertasInspeccion(this.inspeccionId).subscribe(
      data => {
        this.alertas = data;
        console.log('✅ Alertas recibidas:', this.alertas);
      },
      error => {
        console.error('❌ Error al obtener alertas:', error);
      }
    );
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
