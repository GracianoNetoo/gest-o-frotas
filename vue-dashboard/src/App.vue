<template>
  <div class="drawer lg:drawer-open font-display">
    <input type="checkbox" id="my-drawer" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <Navbar
        :isDark="isDark"
        @toggle-drawer="toggleDrawer"
        @toggle-theme="toggleTheme"
      />

      <main class="flex-1 p-6 bg-base-200 dark:bg-backgroundDark transition-colors duration-300">
        <div class="bg-red-500 text-white p-2">
          View Atual: {{ currentView }}
      </div>
        <div v-if="currentView === 'dashboard'">
          <StatsCards />
          <Charts />
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Recents class="lg:col-span-2" />
            <RecentActivity />
          </div>
          <StackBarChart class="lg:col-span-1 mt-6" />
        </div>

        <div v-if="currentView === 'categories'">
          <AllCategories />
        </div>
        <div v-if="currentView === 'vehicles'">
          <Vehicles @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'add-vehicle' || currentView === 'addvehicles'">
          <AddVehicles @navigate="handleNavigation" />
        </div>

        <div v-if="currentView === 'drivers'">
          <Drivers @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'add-driver' || currentView === 'adddriver'">
          <AddDriver @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'licenses' || currentView === 'driverlicenses'">
          <DriverLicenses @navigate="handleNavigation" />
        </div>

        <div v-if="currentView === 'ongoing-maintenance'">
          <ActiveMaintenance @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'add-maintenance' || currentView === 'addmaintenance'">
          <AddMaintenance @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'maintenancehistory'|| currentView === 'maintenance-history'">
          <MaintenanceHistory @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'scheduled-maintenance'|| currentView === 'scheduledmaintenance'">
          <ScheduledMaintenance @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'routes'|| currentView === 'fleetroutes'">
          <FleetRoutes @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'add-route'|| currentView === 'addroute'">
          <AddRoute @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'fuel'|| currentView === 'fuelconsumption'">
          <FuelConsumption @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'settings'">
          <Settings @navigate="handleNavigation" />
        </div>
        <div v-if="currentView === 'all-reports' || currentView === 'reports'">
          <AllReports @navigate="handleNavigation" />
    </div>
      </main>
    </div>

    <div class="drawer-side bg-white dark:bg-backgroundDark border-r border-gray-200 dark:border-primary/10">
      <label for="my-drawer" class="drawer-overlay"></label>
      <Sidebar @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
// Importações de componentes...
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


const isDark = ref(true);
const currentView = ref("dashboard");

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme:dark)").matches;
  }
});

watchEffect(() => {
  const theme = isDark.value ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

const toggleDrawer = () => {
  const drawer = document.getElementById("my-drawer");
  if (drawer) drawer.checked = !drawer.checked;
};

const handleNavigation = (view) => {
  currentView.value = view;
  const drawer = document.getElementById("my-drawer");
  if (drawer && window.innerWidth < 1024) {
    drawer.checked = false;
  }
};

import { watch } from "vue";
import { fleetStore } from "./store/fleetStore";

// Observa qualquer mudança profunda na lista de veículos e salva
watch(
  () => fleetStore.vehicles,
  (newVehicles) => {
    localStorage.setItem('fleet_vehicles', JSON.stringify(newVehicles));
  },
  { deep: true }
);
</script>