import React, { useEffect, useState } from 'react';

import { GridContent } from './styles';

import { DataGrid } from '@material-ui/data-grid';
import { columns, IMainRow } from '../../assets/DataGridConfig'

import { api } from '../../service/api';

const MainDataGrid: React.FC = () => {

  const [rowA, setRowA] = useState<IMainRow[]>([])
  const [rowB, setRowB] = useState<IMainRow[]>([])

  const [isLoadedMain, setIsLoadedMain] = useState<boolean>(false);
  const [isLoadedCo, setIsLoadedCo] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const now = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-')
    const tomorrow = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate() + 1).padStart(2, '0')].join('-')
    setIsLoadedMain(true)
    api.get(`/reports/attendanceForPeriod/?initial_date=${now}&final_date=${tomorrow}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
      }
    }).then(
      response => {
        const datas = response.data
        for (let i = 0; i < datas.length; i++) {
          datas[i].couple_id = (datas[i].id) % 2
        }
        setRowA(datas)
      }
    ).catch(err => { console.log(err) }).finally(() => {
      setIsLoadedMain(false)
    })
    setIsLoadedCo(true)
    api.get('attendance', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('@TokenAGMed')}`
      }
    }).then(
      response => {
        const datas = response.data
        for (let i = 0; i < datas.length; i++) {
          datas[i].attendance_date = new Date(datas[i].attendance_date).toLocaleDateString('pt-br')
          datas[i].couple_id = (datas[i].id) % 2
        }
        setRowB(datas)
      }
    ).catch(err => { console.log(err) }).finally(() => {
      setIsLoadedCo(false)
    })
  }, [])

  return (
    <GridContent>
      <section className="main-item">
        <h2>Agendamentos do dia</h2>
        <div>
          {isLoadedMain ? (
            <DataGrid className="grid" rows={rowA} columns={columns} pageSize={14} checkboxSelection loading
              getRowClassName={(params) => `value-${params?.getValue(params.id, 'couple_id')}`}
            />
          ) : (
            <DataGrid className="grid" rows={rowA} columns={columns} pageSize={14} checkboxSelection
              getRowClassName={(params) => `value-${params?.getValue(params.id, 'couple_id')}`}
            />
          )}
        </div>
      </section>
      <section className="co-item">
        <h2>Próximos agendamentos</h2>
        <div>
          {isLoadedCo ? (
            <DataGrid className="grid" rows={rowB} columns={columns} pageSize={14} checkboxSelection loading
              getRowClassName={(params) => `value-${params.getValue(params.id, 'couple_id')}`}
            />
          ) : (
            <DataGrid className="grid" rows={rowB} columns={columns} pageSize={14} checkboxSelection
              getRowClassName={(params) => `value-${params.getValue(params.id, 'couple_id')}`}
            />
          )}
        </div>
      </section>
    </GridContent>
  );
}

export default MainDataGrid;