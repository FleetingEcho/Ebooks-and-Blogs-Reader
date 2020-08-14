<template>
    <div>
    <!-- <Upload
        multiple
        ref="ebookUpload"
        type="drag"
        style="width:70%;margin-left:15%;margin-bottom:30px;"
        :on-success="handleSuccess"
        :show-upload-list="false"
        :action="`${baseURL}/upload_file`">
        <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" ></Icon>
            <p>Click or drag E-book here to upload</p>
        </div>
    </Upload> -->
    <img src="../assets/images/booksPage.png" style="margin-left:0%;width:100%;height:300px;margin-bottom:60px;" alt="">
    <!-- Echarts -->
     <div id="main" style="width:600px;height:400px;margin-left:200px;margin:0 auto;"></div>
    </div>
</template>
<script>
import { baseURL } from '@/config'

  export default {
        data () {
            return {
                switch1: false,
                baseURL
            }
        },
        mounted(){
           this.drawChart();
        },
        methods: {
            change (status) {
                this.$Message.info('Status is：' + status);
            },
              drawChart() {
      // Based on the prepared dom, initialize the echarts instance
      let myChart = this.$echarts.init(document.getElementById("main"));
      // Specify the configuration items and data of the chart
      var colors = [ '#d14a61','#5793f3', '#675bba'];

      let option = {
    color: colors,

    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:['2019 Reading Time', '2020 Reading Time']
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return 'Reading Times  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12']
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return 'Reading Time  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '2019 Reading Time',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [2.6, 56.9, 99.0, 26.4, 28.7, 30.7, 75.6, 82.2, 148.7, 182.8, 66.0, 20.3]
        },
        {
            name: '2020 Reading Time',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 89.2, 181.6, 0, 0, 0, 0, 0]
        }
    ]
};

      // Use the configuration items and data just specified to display the chart.
      myChart.setOption(option);
    },
    handleSuccess () {
      this.$Message.success('Successfully uploaded')
      this.file = null
       this.$router.push('/upload');
    },

        }
    }
</script>
