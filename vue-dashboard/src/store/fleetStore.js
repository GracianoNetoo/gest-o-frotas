import { reactive, computed } from 'vue';

// 1. Lógica do localStorage (Fora do objeto)
const savedVehicles = localStorage.getItem('fleet_vehicles');
const initialVehicles = savedVehicles ? JSON.parse(savedVehicles) : [
    { id: 1, plate: 'ABC-1234', model: 'Ford Ranger', status: 'Em Uso', category: 'Caminhões' },
    { id: 2, plate: 'XYZ-5678', model: 'VW Amarok', status: 'Disponível', category: 'Vans' },
    { id: 3, plate: 'DEF-9012', model: 'Toyota Hilux', status: 'Manutenção', category: 'Caminhões' }
];

export const fleetStore = reactive({
    // --- ESTADO ---
    vehicles: initialVehicles,
    drivers: [
        { id: 1, name: 'João Silva', active: true },
        { id: 2, name: 'Maria Santos', active: true },
    ],

    // --- GETTERS (Cálculos para StatsCards) ---
    totalVehicles: computed(() => fleetStore.vehicles.length),
    vehiclesInUse: computed(() => fleetStore.vehicles.filter(v => v.status === 'Em Uso').length),
    pendingMaintenance: computed(() => fleetStore.vehicles.filter(v => v.status === 'Manutenção').length),
    activeDrivers: computed(() => fleetStore.drivers.filter(d => d.active).length),

    // --- GRÁFICOS ---
    vehicleStatusDistribution: computed(() => [
        fleetStore.vehiclesInUse.value,
        fleetStore.vehicles.filter(v => v.status === 'Disponível').length,
        fleetStore.pendingMaintenance.value
    ]),

    categoryDistribution: computed(() => {
        const categories = ['Caminhões', 'Vans', 'Carros', 'Motocicletas'];
        return categories.map(cat => 
            fleetStore.vehicles.filter(v => v.category === cat).length
        );
    }),

    // --- AÇÕES (As funções que você chama nos componentes) ---
    addVehicle(novoVeiculo) {
        this.vehicles.push({
            id: Date.now(),
            ...novoVeiculo
        });
        this.saveToStorage();
        console.log("Veículo adicionado com sucesso!");
    },

    saveToStorage() {
        localStorage.setItem('fleet_vehicles', JSON.stringify(this.vehicles));
    }
});