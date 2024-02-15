import styled from 'styled-components';
import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';
import {useCabins} from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import {useSearchParams} from 'react-router-dom';

function CabinTable() {
  const {isLoading, cabins} = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  
  if (isLoading) return <Spinner/>;
  
  const filterValue = searchParams.get("discount") || 'all';
  
  let filteredCabins;
  
  if (filterValue === 'all') {
    filteredCabins = cabins;
  }
  if (filterValue === 'no-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }
  if (filterValue === 'with-discount') {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }
  
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  
  const [field, direction] = sortBy.split("-");
  
  switch (field) {
    case 'name':
      filteredCabins = filteredCabins.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case'regularPrice':
      filteredCabins.sort((a,b) => a.regularPrice - b.regularPrice);
      break;
    case 'maxCapacity':
      filteredCabins = filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity);
      break;
    default:
      break;
  }

  if (direction === 'desc') { filteredCabins.reverse(); }
  
  console.log(field,direction,sortBy,filteredCabins);
  
  return (
      <Menus>
        <Table columns={'0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'}>
          <Table.Header role="row">
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>
          
          <Table.Body
              key={cabins.id}
              data={filteredCabins}
              render={(cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin}/>
              )}/>
        </Table>
      </Menus>
  );
}

export default CabinTable;
