import React, { useState, useEffect } from 'react';
import { MapPin, Trash2, Star, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Checkbox } from '@/components/ui/checkbox';
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalTitle } from '@/components/ui/modal';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '123 Main St, Anytown USA', isFavorite: true },
    { id: 2, label: 'Office', address: '456 Oak Rd, Someplace CA', isFavorite: false },
    { id: 3, label: 'Friends & Family', address: '789 Pine Ave, Elsewhere NY', isFavorite: true },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newIsFavorite, setNewIsFavorite] = useState(false);

  useEffect(() => {
    // Load saved addresses from local storage or API
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  useEffect(() => {
    // Save addresses to local storage
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleAddressUpdate = () => {
    const updatedAddresses = addresses.map((addr) =>
      addr.id === selectedAddress.id
        ? { ...addr, label: newLabel, address: newAddress, isFavorite: newIsFavorite }
        : addr
    );
    setAddresses(updatedAddresses);
    setSelectedAddress(null);
    setShowModal(false);
  };

  const handleAddressDelete = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    setSelectedAddress(null);
  };

  const handleAddressSearch = async (query) => {
    try {
      const response = await axios.get(`/api/search-address`, { params: { query } });
      console.log('Search results:', response.data);
    } catch (error) {
      console.error('Error searching for address:', error);
    }
  };

  const handleAddressAdd = () => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1;
    const newAddr = {
      id: newId,
      label: newLabel,
      address: newAddress,
      isFavorite: newIsFavorite,
    };
    setAddresses([...addresses, newAddr]);
    setNewAddress('');
    setNewLabel('');
    setNewIsFavorite(false);
    setShowModal(false);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Address Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Saved Addresses</h3>
            <ul className="space-y-2">
              {addresses.map((address) => (
                <li
                  key={address.id}
                  className={`flex items-center justify-between p-3 rounded-md hover:bg-gray-100 cursor-pointer ${
                    address.id === selectedAddress?.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-gray-500" />
                    <div>
                      <p className="font-medium">{address.label}</p>
                      <p className="text-gray-500 text-sm">{address.address}</p>
                    </div>
                  </div>
                  {address.isFavorite && <Star className="text-yellow-500" />}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedAddress && (
              <div>
                <h3 className="text-lg font-medium mb-2">Edit Address</h3>
                <Input
                  type="text"
                  label="Label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
                <Input
                  type="text"
                  label="Address"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    checked={newIsFavorite}
                    onChange={(e) => setNewIsFavorite(e.target.checked)}
                  />
                  <span>Save as Favorite</span>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddressUpdate}>Update</Button>
                  <Button variant="outline" onClick={() => handleAddressDelete(selectedAddress.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Search addresses"
              className="w-full"
              onChange={(e) => handleAddressSearch(e.target.value)}
            />
            <Search className="text-gray-500" />
          </div>
          <Button onClick={() => setShowModal(true)}>Add Address</Button>
        </div>
      </CardFooter>

      <Modal open={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add New Address</ModalTitle>
          </ModalHeader>
          <Input
            type="text"
            label="Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <Input
            type="text"
            label="Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              checked={newIsFavorite}
              onChange={(e) => setNewIsFavorite(e.target.checked)}
            />
            <span>Save as Favorite</span>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddressAdd}>Save</Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default AddressManagement;