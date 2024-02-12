import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable.jsx';
import Button from '../ui/Button.jsx';
import CreateCabinForm from '../features/cabins/CreateCabinForm.jsx';
import {useState} from 'react';

function Cabins()
{
  const [showForm, setShowForm] = useState(false);

  return (
      <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
