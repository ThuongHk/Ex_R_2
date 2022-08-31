import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {STAFFS, DEPARTMENTS} from './staffs';


const staffSlice = createSlice({
    // const {DEPARTMENTS, STAFFS} = staffs
    name: 'Staff',
    initialState: {
        status: 'idle',
        searchStaff: '',
        allStaff: [],
        department:[]
    },
    reducers: {
        searchStaff: (state, action) => {
            state.searchStaff = action.payload
        },
        addStaff: (state, action) =>{
            // console.log(action);
            state.allStaff.push(action.payload)
        }
    },
    extraReducers: builder =>{
        builder 
        .addCase(getStaff.fulfilled, (state, action) =>{
            state.status = 'success'
            state.allStaff = action.payload
            console.log(action.payload);
        })
        .addCase(addStaff.fulfilled, (state, action)=>{
            state.status = 'success'
            state.allStaff.push(action.payload)
            console.log(action.payload);
        })
        .addCase(editStaff.fulfilled, (state, action) =>{
            state.status = 'success';
            state.allStaff = action.payload
            console.log(action.payload);
        })
        .addCase(delStaff.fulfilled, (state, action)=>{
            state.status = 'success';
            state.allStaff = action.payload
            // const newStaff = state.allStaff.filter(sat => sat.id !== staffId)
            // state.allStaff = newStaff
        })
    }
})

export const getStaff = createAsyncThunk('staff/getStaff', async () =>{
    const res = await fetch('https://nodejstesthatn.herokuapp.com/')
    const data = await res.json()
    console.log(data);
    return data

})
export const addStaff = createAsyncThunk('staff/addStaff', async (newStaff)=>{
    const res = await fetch('https://nodejstesthatn.herokuapp.com/', {
        method: 'POST',
        body: JSON.stringify(newStaff),
        headers: { 'Content-Type': 'application/json'}
    })
    
    const data = await res.json()
    return data

})

export const editStaff = createAsyncThunk('staff/editStaff', async (staffId) => {
    const res = await fetch('https://rjs101xbackend.herokuapp.com/staffs' + '/' + staffId,
    {
        method: 'PATCH',
        body: JSON.stringify(staffId),
        header: {
            'content-type': 'application/json',
            'Accept': 'application/json'

        }
    })
    const data = await res.json();
    console.log(data);
    return data
})

export const delStaff = createAsyncThunk('staffs/delStaff', async (staffId) => {    
    const res = fetch('https://nodejstesthatn.herokuapp.com' + '/' + staffId, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}})
    .then(data => data.json())
    // const data = await res.json()
    return res
    }
);

export default staffSlice;