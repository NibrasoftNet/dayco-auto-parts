"use client";

import Image from "next/image";
import Link from "next/link";

import { ExternalLink } from "lucide-react";

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

const ProductDetailsModal = ({
  article,
  loading = false,
}: {
  article: ArticleDetailType;
  loading?: boolean;
}) => {
  return (
    <Modal>
      <ModalTrigger className="group/modal-btn flex cursor-pointer justify-center bg-black text-white dark:bg-white dark:text-black">
        <ExternalLink className="mr-2 size-4" />
        <span className="text-sm font-medium">View Details</span>
      </ModalTrigger>
      <ModalBody className="overflow-auto">
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ModalContent>
                <h4 className="mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
                  Complete Details of &nbsp;
                  {article.articleNo}
                </h4>
                <div>
                  <Card className="mx-auto w-full max-w-3xl overflow-auto">
                    <CardHeader className="flex w-full justify-between">
                      <div className="flex w-full justify-between">
                        <div className="flex items-center gap-4">
                          <Image
                            src={article.s3ImageLink || article.imageLink}
                            alt={article.articleProductName}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <CardTitle>{article.articleProductName}</CardTitle>
                            <p className="text-muted-foreground text-sm">
                              {article.supplierName} · #{article.articleNo}
                            </p>
                          </div>
                        </div>
                        <Image
                          src={
                            getSupplierProperty(
                              String(article.supplierId),
                              "supLogoURL"
                            ) || "/placeholder.png"
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
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="info">Info</TabsTrigger>
                          <TabsTrigger value="oem">OEM Numbers</TabsTrigger>
                          <TabsTrigger value="cars">
                            Compatible Cars
                          </TabsTrigger>
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
                                href={
                                  getSupplierProperty(
                                    String(article.supplierId),
                                    "websiteURL"
                                  ) as string
                                }
                                className="text-blue-500 hover:underline"
                              >
                                {getSupplierProperty(
                                  String(article.supplierId),
                                  "websiteURL"
                                )}
                              </Link>
                            </li>
                          </ul>
                        </TabsContent>

                        {/* OEM Numbers Section */}
                        <TabsContent value="oem" className="mt-4">
                          {article.oemNo && article.oemNo?.length > 0 ? (
                            <ul className="list-disc space-y-1 pl-4 text-sm">
                              {article.oemNo.map(
                                (oem: OemNumberType, index: number) => (
                                  <li
                                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
                                        className="hover:text-blue-500 hover:underline"
                                      >
                                        {oem.oemDisplayNo}
                                      </Link>
                                    </p>
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No OEM numbers available.
                            </p>
                          )}
                        </TabsContent>
                        {/* Compatible Cars Section */}
                        <TabsContent value="cars" className="mt-4">
                          {article.compatibleCars?.length > 0 ? (
                            <ul className="space-y-2 overflow-auto text-sm">
                              {article.compatibleCars.map((car) => (
                                <li
                                  key={car.vehicleId}
                                  className="bg-muted/20 rounded-md border p-2 shadow-sm"
                                >
                                  <p className="font-medium">
                                    {car.manufacturerName} {car.modelName}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    Engine: {car.typeEngineName}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {car.constructionIntervalStart} →&nbsp;
                                    {car.constructionIntervalEnd ?? "Present"}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No compatible cars found.
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
                  <span className="flex w-28 cursor-pointer items-center justify-center rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black">
                    Close
                  </span>
                </ModalClose>
              </ModalFooter>
            </>
          )}
        </>
      </ModalBody>
    </Modal>
  );
};

export default ProductDetailsModal;
