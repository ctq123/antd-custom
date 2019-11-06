import React, { useState, useEffect } from 'react'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts'
import { Progress } from 'antd'
import styles from './index.less'
import axios from 'axios'

const System = () => {
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])

  const getChartData = (type) => {
    if (type) {
      const url = `api/chart${type}`
      axios.get(url)
      .then(resp => {
        console.log("resp", resp)
        type === 1 ? setData1(resp) : setData2(resp)
      })
      .catch(e => {})
    }
  }

  // 等价于componentDidMount
  useEffect(() => {
    getChartData(1)
    getChartData(2)
  }, [])

  const cols = {
    value: {
      min: 0,
      formatter(val) {
        return val + '亿'
      }
    }
  }

  const fields1 = {
    x: 'month',
    y: 'count'
  }

  const fields2 = {
    x: 'year',
    y: 'value'
  }

  return (
    <aside className={styles.content}>
      <div className={styles.body}>
        <div className={styles.block}>
          <div className={styles.blick_item}>
            <div className={styles.title}>各种类占比（样例）</div>
            <hr />
            <div className={styles.circles}>
              <Progress percent={23} type="circle" />
              <Progress percent={45} type="circle" strokeColor={{ '0%': '#87d068', '100%': '#87d068' }} />
              <Progress percent={60} type="circle" strokeColor={{ '0%': '#faad15', '100%': '#faad15' }} />
            </div>
          </div>
        </div>

        <div className={styles.block}>
          <div className={styles.blick_item2}>
            <div className={styles.title}>支付量趋势（样例）</div>
            <hr />
            <div className={styles.charts}>
            <Chart height={400} data={data1} forceFit>
              <Axis name={fields1.x} />
              <Axis name={fields1.y} />
              <Tooltip
                crosshairs={{
                  type: "y"
                }}
              />
              <Geom type="interval" position={`${fields1.x}*${fields1.y}`} />
            </Chart>
            </div>
          </div>
          <div className={styles.blick_item2}>
            <div className={styles.title}>销售量趋势（样例）</div>
            <hr />
            <div className={styles.charts}>
              <Chart height={400} data={data2} scale={cols} forceFit>
                <Axis name={fields2.x} />
                <Axis name={fields2.y}/>
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom type="line" position={`${fields2.x}*${fields2.y}`} size={2} />
                <Geom
                  type="point"
                  position={`${fields2.x}*${fields2.y}`}
                  size={4}
                  shape={"circle"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default System