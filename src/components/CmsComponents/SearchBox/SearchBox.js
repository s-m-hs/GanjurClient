import React, { useContext, useEffect, useState, useRef } from 'react'
import { CmsContext } from '../../../context/CmsContext';
import './SearchBox.css'

export default function SearchBox({ array, placeholder, id, classs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1); // To keep track of 
  let { setXtSearchB, setXtSearchC, setXtSearchD, setXtSearchE, setXtSearchF, xtSearchH, setXtSearchH, setXtSearchG, xtSearchI, setXtSearchI,
    xtSearchJ, setXtSearchJ, xtSearchk, setXtSearchk, resetSearchbox, setResetSearchbox, flagError } = useContext(CmsContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowOptions(true);
    setActiveIndex(-1); // Reset active index when search term changes
  };
  const handleOptionClick = (item) => {
    // console.log(item)
    setShowOptions(false);
    setActiveIndex(-1);
    if (id === 'categoryCode') {
      // console.log(item)
      setSearchTerm(item.text);
      setXtSearchB(item.code)
    } else if (id === 'categoryCodeId') {
      // console.log(item)
      setSearchTerm(item.text);
      setXtSearchB(item.code)
    }
    else if (id === 'productCategoryCode') {
      // console.log(item)
      setXtSearchC(item.code)
      setSearchTerm(item.name);
    } else if (id === 'manufacturerName') {
      setXtSearchD(item.name)
      setSearchTerm(item.name);
    }
    else if (id === 'categoryCodeForAdd') {
      setXtSearchE(item.id)
      setSearchTerm(item.text);
    } else if (id === 'productCategoryCodeForAdd') {
      setXtSearchF(item.id)
      setSearchTerm(item.name);
    } else if (id === 'manufacturerNameForAdd') {
      setXtSearchG(item.id)
      setSearchTerm(item.name);
    } else if (id === 'UserArray') {
      setXtSearchH(item.id)
      setSearchTerm(item.cyUsNm);
    }
    else if (id === 'accountArrayA') {
      setXtSearchI(item.id)
      setSearchTerm(item.title);
    }
    else if (id === 'accountArrayB') {
      setXtSearchJ(item.id)
      setSearchTerm(item.title);
    }
    else if (id === 'factorProducts') {
      setXtSearchk(item.id)
      setSearchTerm(item.name);
    }

    // setCategoryr(item.id)

    // setValue(!flagUpdate ? 'category' : 'update.category' , `${item.id}`);
  };
  const filteredCategoryItems = array?.filter(item => {
    return (
      id === 'categoryCode' ? item.text?.toLowerCase().includes(searchTerm?.toLowerCase()) :
        id === 'categoryCodeId' ? item.code?.toLowerCase().includes(searchTerm?.toLowerCase()) :
          id === 'productCategoryCode' ? item.name?.toLowerCase().includes(searchTerm?.toLowerCase()) :
            id === 'manufacturerName' ? item.name?.toLowerCase().includes(searchTerm?.toLowerCase()) :
              id === 'categoryCodeForAdd' ? item.text?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                id === 'productCategoryCodeForAdd' ? item.name?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                  id === 'manufacturerNameForAdd' ? item.name?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                    id === 'UserArray' ? item.cyUsNm?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                      id === 'accountArrayA' ? item.title?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                        id === 'accountArrayB' ? item.title?.toLowerCase().includes(searchTerm?.toLowerCase()) :
                          id === 'factorProducts' ? item.name?.toLowerCase().includes(searchTerm?.toLowerCase()) : ''
    )
  }



  );
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      // Move down in the list
      if (showOptions)
        setActiveIndex(prevIndex => (prevIndex < filteredCategoryItems.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (e.key === 'ArrowUp') {
      // Move up in the list
      setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      // Select the active item
      handleOptionClick(filteredCategoryItems[activeIndex]);
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (showOptions) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showOptions, activeIndex, filteredCategoryItems]);
  useEffect(() => {
    if (resetSearchbox) {
      setSearchTerm('')
      setXtSearchB('')
      setXtSearchC('')
      setXtSearchD('')
      setXtSearchE('')
      setXtSearchF('')
      setXtSearchG('')
      setXtSearchH('')
      setXtSearchI('')
      setXtSearchJ('')
      setXtSearchk('')
      setTimeout(() => {
        setResetSearchbox(false)
      }, 0.3);
    }
  }, [resetSearchbox])
  return (
    <div className="dropdown-container">
      <input
        // ref={styleRefB}

        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className={(flagError && id === classs) ? `search-input ${classs} formerror` : `search-input ${classs}`}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 100)}
      />
      {showOptions && (
        <div className="dropdown-options">
          {filteredCategoryItems?.length > 0 ? (
            filteredCategoryItems?.map((item, index) => (
              <div
                key={item.id}
                className={`dropdown-option ${index === activeIndex ? 'active' : ''}`}
                onMouseDown={() => {
                  handleOptionClick(item)
                }}
              >
                {id === 'categoryCode' ? item.text :
                  id === 'categoryCodeId' ? item.text :
                    id === 'productCategoryCode' ? item.name :
                      id === 'manufacturerName' ? item.name :
                        id === 'categoryCodeForAdd' ? item.text :
                          id === 'productCategoryCodeForAdd' ? item.name :
                            id === 'manufacturerNameForAdd' ? item.name :
                              id === 'UserArray' ? item.cyUsNm :
                                id === 'accountArrayA' ? item.title :
                                  id === 'accountArrayB' ? item.title :
                                    id === 'factorProducts' ? item.name : ''

                }

              </div>
            ))
          ) : (
            <div className="dropdown-option"> موردی پیدا نشد...</div>
          )}
        </div>
      )}
      <select
        // className={flagError ? 'producted-category formerror' : 'producted-category'}
        // {...register('category')}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        style={{ display: 'none' }}
      >
        <option value="">انتخاب کنید...</option>
        {array?.map(item => (
          <option key={item.id} value={item.id}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  )
}
