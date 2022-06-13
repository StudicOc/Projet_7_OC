import dayjs from "dayjs";

export default {
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format("DD/MM/YYYY à HH:mm");
    },
  },
};
