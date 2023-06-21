<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        dateClick: this.handleDateClick,
        eventMouseEnter: this.handleMouseEnter,
        locales: "pt-BR",
        buttonText: {
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          list: "Lista"
        },
        headerToolbar: {
          start: "title",
          center: "",
          end: "today prev,next"
        },
        contentHeight: "auto"
      }
    };
  },
  computed: {
    events: {
      get() {
        return this.$store.state.calendario.events;
      },
      set(valor) {
        this.$store.commit("setEvents", valor);
      }
    }
  },
  methods: {
    handleMouseEnter: function (arg) {
      arg.el.title = arg.el.text;
    }
  }
};
</script>

<template>
  <div>
    <FullCalendar :options="{ ...calendarOptions, events: events }" />
  </div>
</template>

<style>
@media (max-width: 767px) {
  .fc-toolbar.fc-header-toolbar {
    display: flex;
    flex-direction: column;
  }

  .fc-toolbar.fc-header-toolbar .fc-left {
    order: 3;
  }

  .fc-toolbar.fc-header-toolbar .fc-center {
    order: 1;
  }

  .fc-toolbar.fc-header-toolbar .fc-right {
    order: 2;
  }
}
</style>