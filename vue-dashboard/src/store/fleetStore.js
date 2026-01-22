import { reactive } from 'vue';

export const fleetStore = reactive({
  // --- ESTADO ---
  user: JSON.parse(localStorage.getItem('fleet_user')) || null,
  isLoggedIn: !!localStorage.getItem('fleet_user'),
  vehicles: JSON.parse(localStorage.getItem('fleet_vehicles')) || [],
  drivers: JSON.parse(localStorage.getItem('fleet_drivers')) || [],
  maintenances: JSON.parse(localStorage.getItem('fleet_maintenances')) || [],

  // --- MÉTODOS DE AUTENTICAÇÃO ---
  login(credentials) {
    if (credentials.email === 'admin@admin.com' && credentials.password === '123456') {
      const userData = { name: 'Administrador', email: credentials.email };
      this.user = userData;
      this.isLoggedIn = true;
      localStorage.setItem('fleet_user', JSON.stringify(userData));
      return true;
    }
    return false;
  },

  logout() {
    this.user = null;
    this.isLoggedIn = false;
    localStorage.clear(); // Limpa tudo para segurança
    window.location.reload();
  },

  // --- MÉTODOS DE PERSISTÊNCIA (O segredo está nas vírgulas aqui!) ---
  saveToStorage() {
    localStorage.setItem('fleet_vehicles', JSON.stringify(this.vehicles));
    localStorage.setItem('fleet_drivers', JSON.stringify(this.drivers));
    localStorage.setItem('fleet_maintenances', JSON.stringify(this.maintenances));
  },

  addVehicle(vehicle) {
    this.vehicles.push({ ...vehicle, id: Date.now() });
    this.saveToStorage();
  },

  addDriver(driver) {
    this.drivers.push({ ...driver, id: Date.now() });
    this.saveToStorage();
  },

  addMaintenance(maintenance) {
    this.maintenances.push({ ...maintenance, id: Date.now() });
    this.saveToStorage();
  }
});