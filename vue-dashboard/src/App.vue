<template>
  <Login v-if="!fleetStore.isLoggedIn" />

  <div v-else class="drawer lg:drawer-open font-display">
    <input type="checkbox" id="my-drawer" class="drawer-toggle" />
    
    <div class="drawer-content flex flex-col min-h-screen">
      <Navbar
        :isDark="isDark" 
        @toggle-theme="toggleTheme"
        @navigate="handleNavigation"
      />

      <main class="flex-1 p-6 bg-base-200 dark:bg-[#0f172a] transition-colors duration-300">
        <div v-if="currentView === 'dashboard'">
          <StatsCards />
          <Charts />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Recents class="lg:col-span-2" />
            <RecentActivity />
          </div>
          <StackBarChart class="lg:col-span-1 mt-6" />
        </div>

        <div v-if="currentView === 'categories'"><AllCategories /></div>
        
        <div v-if="currentView === 'vehicles'">
          <Vehicles @navigate="handleNavigation" />
        </div>
        
        <div v-if="['add-vehicle', 'addvehicles'].includes(currentView)">
          <AddVehicles @navigate="handleNavigation" />
        </div>

        <div v-if="currentView === 'drivers'">
          <Drivers @navigate="handleNavigation" />
        </div>
        
        <div v-if="['add-driver', 'adddriver'].includes(currentView)">
          <AddDriver @navigate="handleNavigation" />
        </div>

        <div v-if="['licenses', 'driverlicenses'].includes(currentView)">
          <DriverLicenses @navigate="handleNavigation" />
        </div>

        <div v-if="currentView === 'ongoing-maintenance'"><ActiveMaintenance @navigate="handleNavigation" /></div>
        <div v-if="['add-maintenance', 'addmaintenance'].includes(currentView)"><AddMaintenance @navigate="handleNavigation" /></div>
        <div v-if="['maintenancehistory', 'maintenance-history'].includes(currentView)"><MaintenanceHistory @navigate="handleNavigation" /></div>
        <div v-if="['scheduled-maintenance', 'scheduledmaintenance'].includes(currentView)"><ScheduledMaintenance @navigate="handleNavigation" /></div>
        
        <div v-if="['routes', 'fleetroutes'].includes(currentView)"><FleetRoutes @navigate="handleNavigation" /></div>
        <div v-if="['add-route', 'addroute'].includes(currentView)"><AddRoute @navigate="handleNavigation" /></div>
        
        <div v-if="['fuel', 'fuelconsumption'].includes(currentView)"><FuelConsumption @navigate="handleNavigation" /></div>
        <div v-if="currentView === 'settings'"><Settings @navigate="handleNavigation" /></div>
        <div v-if="['all-reports', 'reports'].includes(currentView)"><AllReports @navigate="handleNavigation" /></div>
        <div v-if="['image-upload', 'imageupload'].includes(currentView)"><ImageUpload @navigate="handleNavigation" /></div>
      </main>
    </div>

    <div class="drawer-side bg-white dark:bg-backgroundDark border-r border-gray-200 dark:border-primary/10">
      <label for="my-drawer" class="drawer-overlay"></label>
      <Sidebar @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, watch } from "vue";
import { fleetStore } from "./store/fleetStore.js";

// Importações dos componentes
import Login from "./components/Login.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import StatsCards from "./components/StatsCards.vue";
import Charts from "./components/Charts.vue";
import Recents from "./components/Recents.vue";
import RecentActivity from "./components/RecentActivity.vue";
import StackBarChart from "./components/StackBarChart.vue";
import AllCategories from "./components/AllCategories.vue";
import Vehicles from "./components/Vehicles.vue";
import AddVehicles from "./components/AddVehicles.vue";
import Drivers from "./components/Drivers.vue";
import AddDriver from "./components/AddDriver.vue";
import DriverLicenses from "./components/DriverLicenses.vue";
import ActiveMaintenance from "./components/ActiveMaintenance.vue";
import MaintenanceHistory from "./components/MaintenanceHistory.vue";
import ScheduledMaintenance from "./components/ScheduledMaintenance.vue";
import FleetRoutes from "./components/FleetRoutes.vue";
import FuelConsumption from "./components/FuelConsumption.vue";
import Settings from "./components/Settings.vue";
import AllReports from "./components/AllReports.vue";
import AddMaintenance from "./components/AddMaintenance.vue";
import AddRoute from "./components/AddRoute.vue";
import ImageUpload from "./components/ImageUpload.vue";

const isDark = ref(true);
const currentView = ref("dashboard");

onMounted(() => {
  // Tema
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  }
});

watchEffect(() => {
  const theme = isDark.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle('dark', isDark.value);
  localStorage.setItem("theme", theme);
});

const toggleTheme = () => isDark.value = !isDark.value;

const handleNavigation = (view) => {
  currentView.value = view;
  const drawer = document.getElementById("my-drawer");
  if (drawer && window.innerWidth < 1024) drawer.checked = false;
};

// Persistência LocalStorage para todas as listas principais
watch(() => fleetStore.vehicles, (val) => localStorage.setItem('fleet_vehicles', JSON.stringify(val)), { deep: true });
watch(() => fleetStore.drivers, (val) => localStorage.setItem('fleet_drivers', JSON.stringify(val)), { deep: true });
watch(() => fleetStore.routes, (val) => localStorage.setItem('fleet_routes', JSON.stringify(val)), { deep: true });
</script>