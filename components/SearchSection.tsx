'use client';

import { useState } from 'react';

import { Button } from './ui/button';
// import { DatePickerWithRange } from './ui/date-range-picker';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const SearchSection = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Find Your Perfect Stay
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" placeholder="Where are you going?" />
            </div>
            <div>
              <Label>Dates</Label>
              {/* <DatePickerWithRange
                selected={dateRange}
                onSelect={setDateRange}
              />*/}
            </div>
            <div>
              <Label htmlFor="guests">Guests</Label>
              <Select>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Search</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
