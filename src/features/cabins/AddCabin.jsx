import Modal from '../../ui/Modal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import Button from '../../ui/Button.jsx';

export function AddCabin() {
  return (
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm/>
        </Modal.Window>
      </Modal>);
}

// export function AddCabin() {
//   const [showForm, setShowForm] = useState(false);
//
//   return (
//       <>
//         <Button onClick={() => setShowForm((show) => !show)}>
//           Add new cabin
//         </Button>
//         {showForm &&
//             <Modal onClose={setShowForm}>
//               <CreateCabinForm onCloseModel={setShowForm}/>
//             </Modal>}
//       </>
//   );
// }