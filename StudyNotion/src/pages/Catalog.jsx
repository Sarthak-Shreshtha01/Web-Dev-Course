import React, { useEffect } from 'react'
import Footer from "../components/common/Footer"
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import Course_card from '../components/core/Catalog/Course_card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("");

    // Fetch all Categories
    useEffect(()=> {
        const getCategories= async() => {
            const res = await apiConnector("GET" , categories.CATEGORIES_API );
            const category_id = 
            res?.data?.data?.filter((ct) => (
                ct.name.split(" ")
                .join("-")
                .toLowerCase() === catalogName))[0]._id;
            
            setCategoryId(category_id);
            
        }
        getCategories();
    }, [catalogName]);

    useEffect(()=> {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
            }
            catch(error){
                console.log(error)
            }
        }
    },[categoryId])

  return (
    <div className='text-white' >
      
        <div>
            <p> {`Home / Catalog /`}
                <span>
                    {catalogPageData?.data?.selectedCategory?.name}    
                </span> 
            </p>
            <p>{catalogPageData?.data?.selectedCategory?.name}</p>
            <p>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section1 */}
            <div>
                <div>Courses to get you started</div>
                <div className='flex gap-x-3' >
                    <p>Most Popular</p>
                    <p>New</p>
                </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>

            {/* Section2 */}
            <div>
                <p>Top Courses in {catalogPageData?.data?.selectedCategory?.name} </p>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* Section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8' >
                    <div className='grid grid-cols-1 lg:grid-cols-2 ' >

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course , index)=> (
                                <Course_card course={course} key={index} Height={"h-[400px]"} />
                            ))
                        }

                    </div>
                </div>
            </div>

        <Footer />

        </div>

    </div>
  )
}

export default Catalog
