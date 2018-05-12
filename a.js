var URLS = [
  "http://amberhosting.herokuapp.com/admin/warehouse/sensordata/1660/change/",
  "http://amberhosting.herokuapp.com/admin/warehouse/sensordata/1661/change/",
  "http://amberhosting.herokuapp.com/admin/warehouse/sensordata/1662/change/"
];

constructor() {
    super()
    this.state = {
      data: []
    }
  }

  extractData(text) {
    var doc = new DOMParser().parseFromString(text, 'text/xml');
    var items_array = [];
    var items = doc.getElementsByTagName('humid');

    var items_array = 

    for (var i = 0; i < items.length; i++) {
      items_array.push({
        title: items[i].getElementsByTagName('title')[0].lastChild.data,
        description: items[i].getElementsByTagName('description')[0].lastChild.data,
        //thumbnail: items[i].getElementsByTagName('enclosure')[0].getAttribute('url'),
        //link: items[i].getElementsByTagName('link')[0].textContent,
        //date: items[i].getElementsByTagName('pubDate')[0].textContent,                    
      })
    }
    return items_array;
  }

  fetchData() {
    var urlArray = [];

    for (var i = 0; i < URLS.length; i++) {
      urlArray.push(URLS[i]);
    }

    fetch(urlArray)
      .then((response) => response.text())
      .then((responseData) => {
        this.setState({
          data: this.extractData(responseData)
        });
      }).done();
  }


  componentDidMount() {
    this.fetchData();
  }

