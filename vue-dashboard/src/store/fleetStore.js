import { reactive, computed } from 'vue';

export const fleetStore = reactive({
  // Dados brutos (Array de objetos)
    vehicles: [
    { id: 1, plate: 'ABC-1234', model: 'Ford Ranger', status: 'Em Uso', type: 'Caminhões' },
    { id: 2, plate: 'XYZ-5678', model: 'VW Amarok', status: 'Disponível', type: 'Vans' },
    { id: 3, plate: 'DEF-9012', model: 'Toyota Hilux', status: 'Manutenção', type: 'Caminhões' },
  ],
    drivers: [
    { id: 1, name: 'João Silva', active: true },
    { id: 2, name: 'Maria Santos', active: true },
  ],

  // Getters Dinâmicos (Para os teus StatsCards)
  totalVehicles: computed(() => fleetStore.vehicles.length),
  vehiclesInUse: computed(() => fleetStore.vehicles.filter(v => v.status === 'Em Uso').length),
  pendingMaintenance: computed(() => fleetStore.vehicles.filter(v => v.status === 'Manutenção').length),
  activeDrivers: computed(() => fleetStore.drivers.filter(d => d.active).length),

  // Dados para o Gráfico de Rosca (Distribuição de Veículos)
  vehicleStatusDistribution: computed(() => {
    return [
      fleetStore.vehiclesInUse.value,
      fleetStore.vehicles.filter(v => v.status === 'Disponível').length,
      fleetStore.pendingMaintenance.value
    ];
  })
});