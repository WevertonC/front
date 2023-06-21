export default {
  transformInToFormObject(data) {
    let formData = new FormData();
    for (let key in data) {
      if (Array.isArray(data[key])) {
        if (data[key].find(element => typeof element === "object")) {
          data[key].forEach((obj, index) => {
            let keyList = Object.keys(obj);
            keyList.forEach((keyItem) => {
              let keyName = [key, "[", index, "]", ".", keyItem].join("");
              formData.append(keyName, obj[keyItem]);
            });
          });
        } else {
          for (var i = 0; i < data[key].length; i++) {
            formData.append(key, data[key][i]);
          }
        }
      } else if (typeof data[key] === "object") {
        for (let innerKey in data[key]) {
          formData.append(`${key}.${innerKey}`, data[key][innerKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }
    return formData;
  },
  transformInToFormObjectWithFile(data) {
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  },
  transformInToFormObjectTicketWithFile(ticket) {
    let formData = new FormData();
    for (let key in ticket.ticketInteracao[0]) {
      if (Array.isArray(ticket.ticketInteracao[0][key])) {
        if (ticket.ticketInteracao[0][key].find(element => typeof element === "object")) {
          ticket.ticketInteracao[0][key].forEach((obj, index) => {
            let keyList = Object.keys(obj);
            keyList.forEach((keyItem) => {
              let keyName = [key, "[", index, "]", ".", keyItem].join("");
              formData.append(keyName, obj[keyItem]);
            });
          })
        }
      }
    }
    return formData;
  }
}