const config = state => state.app.config;
const palette = state => state.app.config.palette;
const isLoading = state => state.app.isLoading;
const getShortFormatDate = state => value => {
  if (value !== '' && typeof value !== 'undefined') {
    return value.split('T')[0].substring(5) + ' ' + value.split('T')[1].split('\.')[0]
  } else {
    return ''
  }
};
const getFormatDate = state => value => {
  if (value !== '' && typeof value !== 'undefined') {
    if (typeof value === "number"){
      value = formatDate(value)
    }
    return value;
    //.split('T')[0] + ' ' + value.split('T')[1].split('\.')[0]
  } else {
    return ''
  }
};

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let YY = date.getFullYear() + '-';
  let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD +" "+hh + mm + ss;
}

const TRUE = state => state.app.static.TRUE;
const FALSE = state => state.app.static.FALSE;

const getModeName = state => value => {
  switch (value) {
    case 'new': {
      return '新建';
    }
    case 'edit': {
      return '编辑';
    }
    case 'info': {
      return '查看';
    }
    default: {
      return '';
    }
  }
};
const getTaskStatusEnum = state => value => {
  switch (value) {
    case 0: {
      return '准备中'
    }
    case 1: {
      return '待运行'
    }
    case 2: {
      return '运行中'
    }
    case 3: {
      return '暂停中'
    }
    case 4: {
      return '结束'
    }
    case 5: {
      return '异常'
    }
  }
};

const getWebSocketBaseUrl = state => value => {
  return `ws://${process.env.NODE_ENV === 'development' ? 'localhost:8097' : 'testvlatava-agent-tool.rta-os.com'}/vltava/ws/`
};

const getAppList = state => value => {
  return state.app.global.appList;
};

export {
  config,
  palette,
  isLoading,
  getFormatDate,
  getShortFormatDate,
  TRUE,
  FALSE,
  getModeName,
  getTaskStatusEnum,
  getWebSocketBaseUrl,
  getAppList,
}
