import React, { useState } from 'react';
import { InputGroup, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { Store } from '../../../../../store';
import { randomId } from '@mieuteacher/meomeojs';
import { productAction } from '../../../../../store/slices/product.slice';
import { uploadToFirebase } from '../../../../../service/firebase';
import { api } from '../../../../../service/apis';

interface Category {
  id: number;
  title: string;
}
interface uploadToFirebase {
  file: any;
  fallBackUrl: any;
}

interface PicturePreview {
  url: string;
  file: File;
}

interface ProductCreateFormProps {
  dispatch: any;
}


export default function ProductCreateForm({ }: ProductCreateFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [picturesPreview, setPicturesPreview] = useState<PicturePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const categoryStore = useSelector((store: Store) => store.categoryStore);
  const reduxDispatch = useDispatch();

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!(e.target as any).avatar.files[0]) return;

    try {
      setIsLoading(true);

      const newProduct = {
        name: (e.target as any).name.value,
        price: Number((e.target as any).price.value),
        avatar: await uploadToFirebase((e.target as any).avatar.files[0], null),
        categoryId: Number((e.target as any).categoryId.value)
      };

      const pictures: any[] = [];
      for (const item of picturesPreview) {
        const url = await uploadToFirebase(item.file, null);
        pictures.push({ url });
      }


      const result = await api.product.create({
        newProduct,
        pictures
      });

      Modal.success({
        title: "Notification",
        content: "Bạn đã thêm sản phẩm thành công!",
        onOk: () => {
          reduxDispatch(productAction.addData(result.data.data));
          (e.target as any).name.value = "";
          (e.target as any).price.value = "";
          setPicturesPreview([]);
          (e.target as any).avatar.value = null;
          setSelectedCategoryId(null);
          reduxDispatch(productAction.loadModal());
          setIsLoading(false);
        }
      });
    } catch (err: any) {
      console.log(err);
      console.log((e.target as any).name.value);
      console.log((e.target as any).price.value);
      console.log((e.target as any).avatar.value);




      alert("lỗi gì đó");
      setIsLoading(false);
    }
  }

  return (
    <div className='product_create_form'>
      <form onSubmit={(e) => handleAddProduct(e)}>
        <div className='btn_box'>
          <span>Create Product</span>
          <button onClick={() => reduxDispatch(productAction.loadModal())} type='button' className='btn btn-danger'>X</button>
        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Name</InputGroup.Text>
          <Form.Control placeholder="Product Name" name='name' />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Price</InputGroup.Text>
          <Form.Control placeholder="Product Price" name='price' />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Avatar</InputGroup.Text>
          <div className='input_avatar'>
            <img src="https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg" alt="avatar" />
            <input onChange={(e) => {
              if ((e.target as any).files.length > 0) {
                const spanEl = (e.target as any).parentNode.querySelector('span');
                const imgEl = (e.target as any).parentNode.querySelector('img');
                spanEl.style.opacity = "0";
                imgEl.src = URL.createObjectURL((e.target as any).files[0]);
              }
            }} name='avatar' type="file" />
            <span>+</span>
          </div>
        </InputGroup>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Picture List</Form.Label>
          <Form.Control onChange={(e) => {
            const tempArr: PicturePreview[] = [];
            if ((e.target as any).files.length > 0) {
              for (const file of (e.target as any).files) {
                tempArr.push({
                  url: URL.createObjectURL(file),
                  file
                });
              }
            }
            if (picturesPreview.length + tempArr.length > 10) {
              alert("max size 10");
              return;
            }
            setPicturesPreview([...tempArr, ...picturesPreview]);
          }} type="file" multiple max={10} />
        </Form.Group>
        <div className='pictures'>
          {
            picturesPreview.map((item, index) => (
              <div key={randomId()} className='item'>
                <img src={item.url} alt={`picture-${index}`} />
                <button type='button' onClick={() => {
                  setPicturesPreview(picturesPreview.filter((itemFilter, indexFilter) => indexFilter !== index));
                }} className='btn btn-danger'>X</button>
              </div>
            ))

          }

        </div>
        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "80px" }} id="basic-addon1">Category</InputGroup.Text>
          <Form.Select
            name='categoryId'
            aria-label="Default select example"
            value={selectedCategoryId || ''}
            onChange={(e) => setSelectedCategoryId(Number((e.target as any).value))}
          >
            <option value={""}>Please choose</option>
            {
              (categoryStore?.data || []).map((item: Category) => (
                <option key={randomId()} value={item.id.toString()}>{item.title}</option>
              ))
            }
          </Form.Select>


        </InputGroup>
        <button type='submit' className='btn btn-success btn-update' disabled={isLoading}>
          {isLoading ? (
            <Spinner className='loading' animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            'Add'
          )}
        </button>

      </form>


    </div>

  );
}
