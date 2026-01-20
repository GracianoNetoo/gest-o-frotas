import { reactive, computed } from 'vue';

export const fleetStore = reactive({
    // 1. O ESTADO (Os dados)
vehicles: [
    { id: 1, plate: 'ABC-1234', model: 'Ford Ranger', status: 'Em Uso', category: 'Caminhões' },
    { id: 2, plate: 'XYZ-5678', model: 'VW Amarok', status: 'Disponível', category: 'Vans' }
],
  drivers: [], // Se tiver motoristas, coloque aqui também

  // 2. OS GETTERS (O que o StatsCards lê)
    totalVehicles: computed(() => fleetStore.vehicles.length),
    vehiclesInUse: computed(() => fleetStore.vehicles.filter(v => v.status === 'Em Uso').length),
    pendingMaintenance: computed(() => fleetStore.vehicles.filter(v => v.status === 'Manutenção').length),
    activeDrivers: computed(() => 55), // Ajuste conforme sua lógica

  // 3. AS AÇÕES (As funções para alterar os dados)
  // Adicione esta função dentro do objeto fleetStore existente
    addVehicle(novoVeiculo) {
        this.vehicles.push({
            id: Date.now(), // Gera um ID único baseado no tempo
    ...novoVeiculo
    });
    console.log("Novo veículo cadastrado com sucesso!");
},
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