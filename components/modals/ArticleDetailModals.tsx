"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { getSupplierProperty } from "@/lib/methods";
import type { ArticleDetailType, OemNumberType } from "@/types/articles.type";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ArticleDetailsModal = ({ article }: { article: ArticleDetailType }) => {
  return (
    <Modal>
      <ModalTrigger className="cursor-pointer bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <ExternalLink className="size-4 mr-2" />
        <span className="text-sm font-medium">View Details</span>
      </ModalTrigger>
      <ModalBody className="overflow-auto">
        <ModalContent>
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Complete Details of &nbsp;
            {article.articleNo}
          </h4>
          <div>
            <Card className="w-full max-w-3xl mx-auto overflow-auto">
              <CardHeader className="flex w-full justify-between">
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={article.imageLink || article.imageMedia || article.s3ImageLink || article.s3image ||"/parts/PART.png"}
                      alt={article.articleProductName}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <CardTitle>{article.articleProductName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {article.supplierName} · #{article.articleNo}
                      </p>
                    </div>
                  </div>
                  <Image
                    src={
                      getSupplierProperty(
                        String(article.supplierId),
                        "supLogoURL",
                      ) ?? "/suppliers/SUPPLIER.svg"
                    }
                    alt={article.supplierName}
                    width={100}
                    height={100}
                    className="rounded-md object-contain"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info" className="w-full">
                  {/* Tabs Navigation */}
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="oem">OEM Numbers</TabsTrigger>
                    <TabsTrigger value="cars">Compatible Cars</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                  </TabsList>

                  {/* Info Section */}
                  <TabsContent value="info" className="mt-4">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>Article ID:</strong>&nbsp;
                        {article.articleId}
                      </li>
                      <li>
                        <strong>Supplier ID:</strong>&nbsp;
                        {article.supplierId}
                      </li>
                      <li>
                        <strong>Supplier Name:</strong>&nbsp;
                        {article.supplierName}
                      </li>
                      <li>
                        <strong>Website:</strong>&nbsp;
                        <Link
                          href={`#`}
                          className="text-blue-500 hover:underline"
                        >
                          {getSupplierProperty(
                            String(article.supplierId),
                            "websiteURL",
                          )}
                        </Link>
                      </li>
                    </ul>
                  </TabsContent>

                  {/* OEM Numbers Section */}
                  <TabsContent value="oem" className="mt-4">
                    {article.oemNo && article.oemNo.length > 0 ? (
                      <ul className="list-disc pl-4 space-y-1 text-sm">
                        {article.oemNo.map((oem: OemNumberType, index: number) => (
                          <li
                            key={index}
                            className="flex w-full items-center justify-between"
                          >
                            <p>
                              <strong>Supplier:</strong>&nbsp;
                              <span>{oem.oemBrand},&nbsp;</span>
                            </p>
                            <p>
                              <strong>Reference:</strong>&nbsp;
                              <Link
                                href={`oem/details/${oem.oemDisplayNo}`}
                                className="hover:underline hover:text-blue-500"
                              >
                                {oem.oemDisplayNo}
                              </Link>
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No OEM numbers available.
                      </p>
                    )}
                  </TabsContent>

                  {/* Compatible Cars Section */}
                  <TabsContent value="cars" className="mt-4">
                    {article.compatibleCars && article.compatibleCars.length > 0 ? (
                      <ul className="space-y-2 text-sm overflow-auto">
                        {article.compatibleCars.map((car) => (
                          <li
                            key={car.vehicleId}
                            className="border p-2 rounded-md shadow-sm bg-muted/20"
                          >
                            <p className="font-medium">
                              {car.manufacturerName} {car.modelName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Engine: {car.typeEngineName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {car.constructionIntervalStart} →&nbsp;
                              {car.constructionIntervalEnd ?? "Present"}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No compatible cars found.
                      </p>
                    )}
                  </TabsContent>

                  {/* Specifications Section */}
                  <TabsContent value="specs" className="mt-4">
                    {article.allSpecifications && article.allSpecifications.length > 0 ? (
                      <ul className="space-y-4 text-sm">
                        {article.allSpecifications.map((spec, index) => (
                          <li key={index} className="flex gap-1 items-center border p-2 rounded-md shadow-sm bg-muted/20">
                            <span className="font-semibold">{spec.criteriaName}:</span>
                            <span>{spec.criteriaValue}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No specifications available.
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </ModalContent>
        <ModalFooter>
          <ModalClose>
            <span className="cursor-pointer flex items-center justify-center bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Close
            </span>
          </ModalClose>
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default ArticleDetailsModal;
