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
    },

    vehicles: JSON.parse(localStorage.getItem('fleet_vehicles')) || [],
    // 1. Nova lista de motoristas
    drivers: JSON.parse(localStorage.getItem('fleet_drivers')) || [],

    saveToStorage() {
        localStorage.setItem('fleet_vehicles', JSON.stringify(this.vehicles));
        localStorage.setItem('settings_user_name', userName.value);
        localStorage.setItem('settings_user_photo', userPhoto.value);
        localStorage.setItem('fleet_drivers', JSON.stringify(this.drivers));
        window.dispatchEvent(new Event('storage'));
        alert("Configurações salvas com sucesso!");
    },

    // 3. Método para adicionar motorista
    addDriver(driver) {
        this.drivers.push({
            id: Date.now(), // ID único para controle
            ...driver
        });
        this.saveToStorage();
    },

    vehicles: JSON.parse(localStorage.getItem('fleet_vehicles')) || [],
    drivers: JSON.parse(localStorage.getItem('fleet_drivers')) || [],
    routes: JSON.parse(localStorage.getItem('fleet_routes')) || [],
    maintenances: JSON.parse(localStorage.getItem('fleet_maintenances')) || [],

    saveToStorage() {
        localStorage.setItem('fleet_vehicles', JSON.stringify(this.vehicles));
        localStorage.setItem('fleet_drivers', JSON.stringify(this.drivers));
        localStorage.setItem('fleet_routes', JSON.stringify(this.routes));
        localStorage.setItem('fleet_maintenances', JSON.stringify(this.maintenances));
    },

    addRoute(route) {
        this.routes.push({ id: Date.now(), ...route });
        this.saveToStorage();
    },

    addMaintenance(record) {
        this.maintenances.push({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...record
        });
        this.saveToStorage();
    },
    fuelLogs: JSON.parse(localStorage.getItem('fleet_fuel')) || [],
    addFuelEntry(entry) {
    this.fuelLogs.push({ id: Date.now(), ...entry });
    this.saveToStorage();
    },

    fuelLogs: JSON.parse(localStorage.getItem('fleet_fuel')) || [],
    addFuelEntry(entry) {
    this.fuelLogs.push({ id: Date.now(), ...entry });
    this.saveToStorage();
    },

});

// Exemplo no App.vue do Vue
import { onMounted, ref } from 'vue';

const user = ref(null);

onMounted(() => {
  const savedUser = localStorage.getItem('user_auth');
  
  if (savedUser) {
    user.value = JSON.parse(savedUser);
    console.log(`Bem-vindo, ${user.value.name} da empresa ${user.value.company}`);
  } else {
    // Se alguém tentar acessar o dashboard sem cadastro/login
    // ele é expulso de volta para o cadastro no Astro
    window.location.href = 'http://localhost:4321/signup'; 
  }
});
