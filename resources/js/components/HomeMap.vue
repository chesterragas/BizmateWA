<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md">
      <vue3-simple-typeahead
        v-model="query" 
        @onInput="generateplace"     
        @selectItem="fetchWeather"
        :items="places"
        :minInputLength="1"
        placeholder="Search location.."
        >
      </vue3-simple-typeahead>
      <div class="current-weather flex items-center justify-between px-6 py-8">
        <div class="flex flex-col md:flex-row items-center">
          <div>
           <p>{{currentDate()}} {{toDayOfWeek()}}</p>
            <div class="text-6xl font-semibold">{{ Math.round(currentTemp.actualTemp) }}°C</div>
            <div>Feels like {{ Math.round(currentTemp.feelsLike) }}°C</div>
          </div>
          <div class="md:mx-6">
            <div>{{ displayLocation }}</div>
          </div>
        </div>
        <div>
          <img v-if="currentTemp.icon" :src="currentTemp.icon"  style="width:100px;height:100px"/>
        </div>
      </div>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const query = ref("");
    const api_key = ref('b70e4ff76edd86d4b22dc2624206b9b3');
    const url_base = ref('http://api.openweathermap.org/data/2.5/');
    const currentTemp =ref({
      actualTemp: "",
      feelsLike: "",
      summary: "",
      icon: ""
    });
    const displayLocation = ref("");
    const iconLink = ref("http://openweathermap.org/img/wn/");
    const places = ref([]);
    const current = new Date();

    function fetchLocation() {
      places.value = [];
      var requestOptions = {
        method: 'GET',
      };
      fetch("https://api.geoapify.com/v1/geocode/search?text="+query.value+"&apiKey=7610937387124824bae6f10702c0b606", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.features.length > 0){
            result.features.forEach(function(resultdata){
              places.value.push(resultdata.properties.formatted);
            });
        }
      })
      .catch(error => console.log('error', error));
    }

    function fetchWeather(e){
        var link = url_base.value+"weather?q="+query.value+"&units=metric&APPID="+api_key.value;
        fetch(link)
        .then(response => response.json())
        .then(data => {
          currentTemp.value.actualTemp = data.main.temp;
          currentTemp.value.feelsLike = data.main.feels_like;
          currentTemp.value.summary = data.main;
          currentTemp.value.icon =
          iconLink.value + data.weather[0].icon + ".png";
        });
        displayLocation.value = e;
    }

    function generateplace(e){
      query.value = e.input;
      fetchLocation();
    }

    function currentDate() {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const date =`${monthNames[current.getMonth()+1]} ${current.getDate()}, ${current.getFullYear()}`;
      return date;
    }

    function toDayOfWeek() {
      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      return days[current.getDay()];
    }

    return {
        toDayOfWeek,
        currentDate,
        displayLocation,
        places,
        generateplace,
        query,
        fetchWeather,
        currentTemp,
        iconLink
      }
    }
}
</script>

