import React, { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export function MetricsPanel(){
  const [metrics, setMetrics] = useState<any>({TAKT:0, utilization:{}, queues:{}})

  const load = async ()=>{
    const m = await apiGet('/api/metrics')
    setMetrics(m)
  }
  useEffect(()=>{ load() }, [])

  const utilLabels = Object.keys(metrics.utilization||{})
  const utilData = Object.values(metrics.utilization||{})

  const qLabels = Object.keys(metrics.queues||{})
  const qData = Object.values(metrics.queues||{})

  return <div style={{padding:8, overflow:'auto', height:'100%'}}>
    <h3>Metryki</h3>
    <div>TAKT: <b>{metrics.TAKT}</b></div>
    <div style={{height:160}}>
      <Bar
        data={{ labels: utilLabels, datasets: [{ label: 'Wykorzystanie (pseudo)', data: utilData }] }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
      />
    </div>
    <div style={{height:160, marginTop:8}}>
      <Line
        data={{ labels: qLabels, datasets: [{ label: 'Kolejki (liczba zleceń-1)', data: qData }] }}
        options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
      />
    </div>
  </div>
}
