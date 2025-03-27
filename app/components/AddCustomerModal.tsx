import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (customerData: any) => Promise<void>;
}

const interests = [
  'Alternative Medicine',
  'Aromatherapy',
  'Baking with Whole Grains',
  'Biking',
  'Bodybuilding',
  'Conservation Efforts',
  'Cooking New Recipes',
  'Crafting',
  'Dancing',
  'Digital Detoxes',
  'Eco-friendly Practices',
  'Environmental Activism',
  'Forest Bathing',
  'Guided Breathwork',
  'Herbalism',
  'Hiking',
  'Holistic Health',
  'Indoor Rock Climbing',
  'Journaling',
  'Martial Arts',
  'Meditation',
  'Mindfulness Practices',
  'Music',
  'Organic Living',
  'Plant-based Cooking',
  'Positive Affirmations',
  'Puzzles',
  'Reading',
  'Running',
  'Sauna Use',
  'Strategy Games',
  'Sustainable Gardening',
  'Sustainable Living',
  'Swimming',
  'Vegan Lifestyle',
  'Vegetarian Diet',
  'Yoga'
];

export default function AddCustomerModal({ isOpen, onClose, onAdd }: AddCustomerModalProps) {
  const [query, setQuery] = useState('');
  const [productQuery, setProductQuery] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
    gender: '',
    preferredProducts: [] as string[],
    primaryReason: '',
    otherReason: '',
    frequencyOfUse: '',
    preferredShoppingMethod: '',
    discoveryMethod: '',
    incomeRange: '',
    occupation: '',
    educationLevel: '',
    preferredCommunication: '',
    interestsHobbies: [] as string[],
    loyaltyProgramMember: false,
  });

  const products = [
    'CBD Oil',
    'Hemp-infused Edibles',
    'Topical Creams',
    'Hemp Flower',
    'Hemp Clothing/Textiles',
    'Hemp-based Supplements'
  ];

  const filteredProducts = productQuery === ''
    ? products
    : products.filter((product) =>
        product
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(productQuery.toLowerCase().replace(/\s+/g, ''))
      );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(formData);
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        age: '',
        gender: '',
        preferredProducts: [],
        primaryReason: '',
        otherReason: '',
        frequencyOfUse: '',
        preferredShoppingMethod: '',
        discoveryMethod: '',
        incomeRange: '',
        occupation: '',
        educationLevel: '',
        preferredCommunication: '',
        interestsHobbies: [],
        loyaltyProgramMember: false,
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handlePrimaryReasonChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      primaryReason: value,
      otherReason: value === 'Other' ? prev.otherReason : ''
    }));
  };

  const handleInterestsChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interestsHobbies: checked
        ? [...prev.interestsHobbies, interest]
        : prev.interestsHobbies.filter(i => i !== interest)
    }));
  };

  const filteredInterests = query === ''
    ? interests
    : interests.filter((interest) =>
        interest
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Customer</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Hemp Products
              </label>
              <Combobox
                value={formData.preferredProducts}
                onChange={(value: string[]) => setFormData(prev => ({ ...prev, preferredProducts: value }))}
                multiple
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Select preferred products"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setProductQuery(event.target.value)}
                    displayValue={(products: string[]) => products.join(', ')}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>

                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-[300px] overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredProducts.length === 0 && productQuery !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                      Nothing found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {filteredProducts.map((product) => (
                        <Combobox.Option
                          key={product}
                          className={({ active }: { active: boolean }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${
                              active ? 'bg-green-600 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`
                          }
                          value={product}
                        >
                          {({ selected, active }: { selected: boolean; active: boolean }) => (
                            <>
                              <div className="flex items-center">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => {}}
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {product}
                                </span>
                              </div>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select multiple options by clicking on them
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Reason for Use</label>
              <select
                required
                value={formData.primaryReason}
                onChange={(e) => handlePrimaryReasonChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select reason</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Anxiety/Stress Management">Anxiety/Stress Management</option>
                <option value="Sleep Aid">Sleep Aid</option>
                <option value="General Wellness">General Wellness</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Other">Other</option>
              </select>
              {formData.primaryReason === 'Other' && (
                <input
                  type="text"
                  required
                  value={formData.otherReason}
                  onChange={(e) => setFormData({ ...formData, otherReason: e.target.value })}
                  placeholder="Please specify"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Frequency of Use</label>
              <select
                required
                value={formData.frequencyOfUse}
                onChange={(e) => setFormData({ ...formData, frequencyOfUse: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Occasionally">Occasionally</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Shopping Method</label>
              <select
                required
                value={formData.preferredShoppingMethod}
                onChange={(e) => setFormData({ ...formData, preferredShoppingMethod: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select method</option>
                <option value="Online">Online</option>
                <option value="In-store">In-store</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Discovery Method</label>
              <select
                required
                value={formData.discoveryMethod}
                onChange={(e) => setFormData({ ...formData, discoveryMethod: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select method</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Family">Friend/Family</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Income Range</label>
              <select
                required
                value={formData.incomeRange}
                onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select range</option>
                <option value="Under $25,000">Under $25,000</option>
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                <option value="$75,000 - $100,000">$75,000 - $100,000</option>
                <option value="Over $100,000">Over $100,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Occupation</label>
              <input
                type="text"
                required
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Education Level</label>
              <select
                required
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select level</option>
                <option value="High School">High School</option>
                <option value="Some College">Some College</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Communication</label>
              <select
                required
                value={formData.preferredCommunication}
                onChange={(e) => setFormData({ ...formData, preferredCommunication: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select method</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Phone">Phone</option>
                <option value="Mail">Mail</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interests & Hobbies
              </label>
              <Combobox
                value={formData.interestsHobbies}
                onChange={(value: string[]) => setFormData(prev => ({ ...prev, interestsHobbies: value }))}
                multiple
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Select interests & hobbies"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                    displayValue={(interests: string[]) => interests.join(', ')}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>

                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-[300px] overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredInterests.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-gray-300">
                      Nothing found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 p-2">
                      {filteredInterests.map((interest) => (
                        <Combobox.Option
                          key={interest}
                          className={({ active }: { active: boolean }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 rounded-md ${
                              active ? 'bg-green-600 text-white' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                            }`
                          }
                          value={interest}
                        >
                          {({ selected, active }: { selected: boolean; active: boolean }) => (
                            <>
                              <div className="flex items-center">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => {}}
                                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                                  />
                                </div>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {interest}
                                </span>
                              </div>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </div>
                  )}
                </Combobox.Options>
              </Combobox>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select multiple options by clicking on them
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loyalty Program</label>
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.loyaltyProgramMember}
                    onChange={(e) => setFormData({ ...formData, loyaltyProgramMember: e.target.checked })}
                    className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enroll in loyalty program</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 